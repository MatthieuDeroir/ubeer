const express = require("express");
const router = express.Router();
const Controller = require('../controllers/');
const checkJwt  = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Format:
 *       type: object
 *       required:
 *         - name
 *         - volume
 *         - unit
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the format
 *         name:
 *           type: string
 *           description: The name of the format
 *         volume:
 *           type: number
 *           format: float
 *           description: The volume of the format
 *         unit:
 *           type: string
 *           description: The unit of the volume (e.g., ml, oz)
 *       example:
 *         name: Bottle
 *         volume: 500
 *         unit: ml
 */



/**
 * @swagger
 * tags:
 *   - name: Format
 *     description: Format operations
 */

/**
 * @swagger
 * /api/format/get:
 *   get:
 *     summary: Get All Formats
 *     tags: [Format]
 *     responses:
 *       200:
 *         description: Successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Format'
 */
router.get('/get', Controller.Format.getAllFormats);

/**
 * @swagger
 * /api/format/get/{id}:
 *   get:
 *     summary: Get a Format by ID
 *     tags: [Format]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the format to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Format'
 */
router.get('/get/:id', Controller.Format.getFormatById);

/**
 * @swagger
 * /api/format/post:
 *   post:
 *     summary: Create a new Format
 *     tags: [Format]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Format'
 *     responses:
 *       201:
 *         description: Format created successfully.
 */
router.post('/post', checkJwt, Controller.Format.createFormat);

/**
 * @swagger
 * /api/format/put/{id}:
 *   put:
 *     summary: Update a Format
 *     tags: [Format]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the format to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Format'
 *     responses:
 *       200:
 *         description: Format updated successfully.
 */
router.put('/put/:id', checkJwt, Controller.Format.updateFormat);

/**
 * @swagger
 * /api/format/delete/{id}:
 *   delete:
 *     summary: Delete a Format
 *     tags: [Format]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the format to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Format deleted successfully.
 */
router.delete('/delete/:id', checkJwt, Controller.Format.deleteFormat);

module.exports = router;
