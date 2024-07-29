/**
 * @swagger
 * components:
 *   schemas:
 *     Rental:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the rental
 *         name:
 *           type: string
 *           description: The name of the rental
 *         type:
 *           type: string
 *           description: The type of the rental
 *         price:
 *           type: number
 *           description: The price of the rental
 *         available:
 *           type: boolean
 *           description: Availability status of the rental
 *       example:
 *         id: d5fE_asz
 *         name: Rental Name
 *         type: Rental Type
 *         price: 100
 *         available: true
 */

/**
 * @swagger
 * tags:
 *   name: Rentals
 *   description: The rental managing API
 */

/**
 * @swagger
 * /api/rentals:
 *   post:
 *     summary: Create a new rental
 *     tags: [Rentals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rental'
 *     responses:
 *       201:
 *         description: The rental was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/rentals:
 *   get:
 *     summary: Returns the list of all the rentals
 *     tags: [Rentals]
 *     responses:
 *       200:
 *         description: The list of the rentals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rental'
 */

/**
 * @swagger
 * /api/rentals/{id}:
 *   get:
 *     summary: Get the rental by id
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The rental id
 *     responses:
 *       200:
 *         description: The rental description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 *       404:
 *         description: The rental was not found
 */

/**
 * @swagger
 * /api/rentals/{id}:
 *   put:
 *     summary: Update the rental by the id
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The rental id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rental'
 *     responses:
 *       200:
 *         description: The rental was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 *       404:
 *         description: The rental was not found
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /api/rentals/{id}:
 *   delete:
 *     summary: Remove the rental by id
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The rental id
 *     responses:
 *       200:
 *         description: The rental was deleted
 *       404:
 *         description: The rental was not found
 */
