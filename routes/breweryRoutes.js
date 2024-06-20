const express = require("express");
const router = express.Router();
const Controller = require('../controllers/');
const { ensureAdmin } = require('../middlewares/admin');

/**
 * @swagger
 * components:
 *   schemas:
 *     Brewery:
 *       type: object
 *       required:
 *         - name
 *         - city
 *         - address
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the brewery
 *         name:
 *           type: string
 *           description: The name of the brewery
 *         city:
 *           type: string
 *           description: The city where the brewery is located
 *         address:
 *           type: string
 *           description: The address of the brewery
 *       example:
 *         name: Happy Brewing Co.
 *         city: Portland
 *         address: 123 Beer Lane
 */


/**
 * @swagger
 * tags:
 *   - name: Brewery
 *     description: Brewery operations
 */

/**
 * @swagger
 * /api/brewery/get:
 *   get:
 *     summary: Get All Breweries
 *     tags: [Brewery]
 *     responses:
 *       200:
 *         description: Successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brewery'
 */
router.get('/get', Controller.Brewery.getAllBreweries);

/**
 * @swagger
 * /api/brewery/get/{id}:
 *   get:
 *     summary: Get a Brewery by ID
 *     tags: [Brewery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the brewery to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brewery'
 */
router.get('/get/:id', Controller.Brewery.getBreweryById);

/**
 * @swagger
 * /api/brewery/post:
 *   post:
 *     summary: Create a new Brewery
 *     tags: [Brewery]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brewery'
 *     responses:
 *       201:
 *         description: Brewery created successfully.
 */
router.post('/post', Controller.Brewery.createBrewery);

/**
 * @swagger
 * /api/brewery/put/{id}:
 *   put:
 *     summary: Update a Brewery
 *     tags: [Brewery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the brewery to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brewery'
 *     responses:
 *       200:
 *         description: Brewery updated successfully.
 */
router.put('/put/:id', Controller.Brewery.updateBrewery);

/**
 * @swagger
 * /api/brewery/delete/{id}:
 *   delete:
 *     summary: Delete a Brewery
 *     tags: [Brewery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the brewery to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Brewery deleted successfully.
 */
router.delete('/delete/:id', Controller.Brewery.deleteBrewery);

module.exports = router;
