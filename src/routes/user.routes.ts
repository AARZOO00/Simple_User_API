const { Router } = require('express');
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/user.controller');
const { validate } = require('../middlewares/validation');
const { body, param } = require('express-validator');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Bad request (validation error)
 *       '409':
 *         description: Conflict (email already exists)
 */
router.post(
    '/users',
    validate([
        body('name').isString().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('A valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ]),
    createUser
);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users', getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       '200':
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 */
router.get(
    '/users/:id',
    validate([param('id').isInt().withMessage('User ID must be an integer')]),
    getUserById
);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user's name and email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '400':
 *         description: Bad request (validation error)
 *       '404':
 *         description: User not found
 *       '409':
 *         description: Conflict (email already exists)
 */
router.put(
    '/users/:id',
    validate([
        param('id').isInt().withMessage('User ID must be an integer'),
        body('name').optional().isString().notEmpty().withMessage('Name cannot be empty'),
        body('email').optional().isEmail().withMessage('A valid email is required'),
    ]),
    updateUser
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       '204':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 */
router.delete(
    '/users/:id',
    validate([param('id').isInt().withMessage('User ID must be an integer')]),
    deleteUser
);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID.
 *         name:
 *           type: string
 *           description: The user's name.
 *         email:
 *           type: string
 *           description: The user's email address.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was last updated.
 *       example:
 *         id: 1
 *         name: John Doe
 *         email: john.doe@example.com
 *         createdAt: "2023-01-01T12:00:00.000Z"
 *         updatedAt: "2023-01-01T12:00:00.000Z"
 */
module.exports = router;
