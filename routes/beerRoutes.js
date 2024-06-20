const express = require("express");
const router = express.Router();
const Controller = require('../controllers/');
const { ensureAdmin } = require('../middlewares/admin');

/**
 * @swagger
 * components:
 *   schemas:
 *     Beer:
 *       type: object
 *       required:
 *         - name
 *         - style
 *         - type
 *         - abv
 *         - ibu
 *         - breweryId
 *         - formatId
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the beer
 *         name:
 *           type: string
 *           description: The name of the beer
 *         style:
 *           type: string
 *           description: The style of the beer
 *         type:
 *           type: string
 *           description: The type of the beer
 *         abv:
 *           type: number
 *           format: float
 *           description: The alcohol by volume (ABV) of the beer
 *         ibu:
 *           type: integer
 *           description: The International Bitterness Units (IBU) of the beer
 *         description:
 *           type: string
 *           description: The description of the beer
 *         breweryId:
 *           type: integer
 *           description: The ID of the brewery
 *         formatId:
 *           type: integer
 *           description: The ID of the format
 *       example:
 *         name: Lager
 *         style: Pale Lager
 *         type: Beer
 *         abv: 5.0
 *         ibu: 20
 *         price: 5
 *         description: A smooth and refreshing lager
 *         imageUrl: https://dummyimage.com/200x400/000/fff
 *         breweryId: 1
 *         formatId: 1
 */


/**
 * @swagger
 * tags:
 *   - name: Beer
 *     description: Beer operations
 */

/**
 * @swagger
 * /api/beer/get:
 *   get:
 *     summary: Get All Beers
 *     tags: [Beer]
 *     responses:
 *       200:
 *         description: Successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Beer'
 */
router.get('/get', Controller.Beer.getAllBeers);

/**
 * @swagger
 * /api/beer/get/{id}:
 *   get:
 *     summary: Get a Beer by ID
 *     tags: [Beer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the beer to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Beer'
 */
router.get('/get/:id', Controller.Beer.getBeerById);

/**
 * @swagger
 * /api/beer/post:
 *   post:
 *     summary: Create a new Beer
 *     tags: [Beer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Beer'
 *     responses:
 *       201:
 *         description: Beer created successfully.
 */
router.post('/post', Controller.Beer.createBeer);

/**
 * @swagger
 * /api/beer/put/{id}:
 *   put:
 *     summary: Update a Beer
 *     tags: [Beer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the beer to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Beer'
 *     responses:
 *       200:
 *         description: Beer updated successfully.
 */
router.put('/put/:id', Controller.Beer.updateBeer);

/**
 * @swagger
 * /api/beer/delete/{id}:
 *   delete:
 *     summary: Delete a Beer
 *     tags: [Beer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the beer to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Beer deleted successfully.
 */
router.delete('/delete/:id', Controller.Beer.deleteBeer);

module.exports = router;
