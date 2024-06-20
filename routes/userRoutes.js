const express = require('express');
const router = express.Router();
const Models = require('../models');
const checkJwt = require('../middlewares/auth'); // Import the JWT middleware

const User = Models.SQL.User;
const Cart = Models.Mongo.Cart;
const Beer = Models.Mongo.Beer; // Import the Beer model

// Middleware pour vérifier si l'utilisateur existe
const ensureUserExists = async (req, res, next) => {
    const oauthId = req.user.sub;
    let user = await User.findOne({ where: { oauthId } });

    if (!user) {
        const name = req.user.name || req.user.nickname || 'Default Name';
        user = await User.create({
            username: name,
            oauthId: oauthId,
            address: 'default address'
        });
    }

    // Vérifier si l'utilisateur a un panier, sinon créer un nouveau panier
    let cart = await Cart.findOne({ userId: oauthId });
    if (!cart) {
        cart = new Cart({
            userId: oauthId,
            items: [],
            price: 0
        });
        await cart.save();
    }

    req.userRecord = user;
    req.cartRecord = cart;

    next();
};

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User operations
 */

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get the user's profile
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 oauthId:
 *                   type: string
 *                 address:
 *                   type: string
 */
router.get('/profile', checkJwt, ensureUserExists, async (req, res) => {
    try {
        console.log(`Fetching profile for user OAuth ID: ${req.userRecord.oauthId}`);
        res.json(req.userRecord);
    } catch (error) {
        console.error("Error in /profile route:", error);
        res.status(500).send("Failed to fetch user profile");
    }
});

/**
 * @swagger
 * tags:
 *   - name: Cart
 *     description: Cart operations
 */

/**
 * @swagger
 * /api/user/cart:
 *   get:
 *     summary: Get the current user's cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       beerId:
 *                         type: string
 *                       quantity:
 *                         type: integer
 *                 price:
 *                   type: number
 */
router.get('/cart', checkJwt, ensureUserExists, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.userRecord.id }).populate('items.beerId');
        res.json(cart);
    } catch (error) {
        console.error("Error in /cart route:", error);
        res.status(500).send("Failed to fetch cart");
    }
});

/**
 * @swagger
 * /api/user/cart:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               beerId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */
router.post('/cart', checkJwt, ensureUserExists, async (req, res) => {
    try {
        const { beerId, quantity } = req.body;
        const beer = await Models.Mongo.Beer.findById(beerId);

        if (!beer) {
            return res.status(404).send("Beer not found");
        }

        let cart = await Cart.findOne({ userId: req.userRecord.id });

        if (!cart) {
            cart = new Cart({ userId: req.userRecord.id, items: [], price: 0 });
        }

        const itemIndex = cart.items.findIndex(item => item.beerId.toString() === beerId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ beerId, quantity });
        }

        cart.price = cart.items.reduce((total, item) => total + (item.quantity * beer.price), 0);
        await cart.save();

        res.json(cart);
    } catch (error) {
        console.error("Error in /cart route:", error);
        res.status(500).send("Failed to add item to cart");
    }
});

/**
 * @swagger
 * /api/user/cart:
 *   patch:
 *     summary: Update the quantity of an item in the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               beerId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */
router.patch('/cart', checkJwt, ensureUserExists, async (req, res) => {
    try {
      const { beerId, quantity } = req.body;
  
      // Mettre à jour la quantité de l'article dans le panier
      const cart = await Cart.findOneAndUpdate(
        { userId: req.userRecord.id, 'items.beerId': beerId },
        { $set: { 'items.$.quantity': quantity } },
        { new: true }
      );
  
      // Si le panier est mis à jour avec succès, populater les détails de la bière
      if (cart) {
        const updatedCart = await Cart.findOne({ userId: req.userRecord.id }).populate('items.beerId');
        res.json(updatedCart);
      } else {
        res.status(404).send("Cart not found");
      }
    } catch (error) {
      console.error("Error in /cart route:", error);
      res.status(500).send("Failed to update item quantity");
    }
  });
  
/**
 * @swagger
 * /api/user/cart:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               beerId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */
router.delete('/cart', checkJwt, ensureUserExists, async (req, res) => {
    try {
      const { beerId } = req.body;
      const cart = await Cart.findOneAndUpdate(
        { userId: req.userRecord.id },
        { $pull: { items: { beerId } } },
        { new: true }
      );
  
      const updatedCart = await Cart.findOne({ userId: req.userRecord.id }).populate('items.beerId');
      res.json(updatedCart);
    } catch (error) {
      console.error("Error in /cart route:", error);
      res.status(500).send("Failed to remove item from cart");
    }
  });

module.exports = router;
