import { Router } from "express";

import {
    registerUser,
    loginUser,
    logOutUser,
    getMe,
    refreshAccessToken
} from "../controllers/auth.controllers.js";

import {
    userRegistrationValidator,
    userLoginValidator
} from "../validators/auth.validators.js";

import { validate } from "../middlewares/validation.middlewares.js";

import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();




/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     description: Creates a new user account with JWT authentication support.
 *     tags: [Auth]
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - userName
 *               - email
 *               - password
 *               - role
 *
 *             properties:
 *               userName:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 20
 *                 example: shayan123
 *
 *               email:
 *                 type: string
 *                 format: email
 *                 example: shayan@gmail.com
 *
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: Password123
 *
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 example: user
 *
 *     responses:
 *       201:
 *         description: User registered successfully
 *
 *       400:
 *         description: Validation failed
 *
 *       409:
 *         description: User already exists
 */
router.route("/register")
    .post(
        userRegistrationValidator(),
        validate,
        registerUser
    );




/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates user and returns access and refresh tokens.
 *     tags: [Auth]
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - email
 *               - password
 *               - role
 *
 *             properties:
 *               email:
 *                 type: string
 *                 example: shayan@gmail.com
 *
 *               password:
 *                 type: string
 *                 example: Password123
 *
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 example: user
 *
 *     responses:
 *       200:
 *         description: Login successful
 *
 *       401:
 *         description: Invalid credentials
 *
 *       404:
 *         description: User not found
 */
router.route("/login")
    .post(
        userLoginValidator(),
        validate,
        loginUser
    );




/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Clears access token and refresh token cookies.
 *     tags: [Auth]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: User logged out successfully
 *
 *       401:
 *         description: Unauthorized
 */
router.route("/logout")
    .post(
        verifyJWT,
        logOutUser
    );




/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user
 *     description: Returns details of currently authenticated user.
 *     tags: [Auth]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Current user fetched successfully
 *
 *       401:
 *         description: Unauthorized
 */
router.route("/me")
    .get(
        verifyJWT,
        getMe
    );




/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     description: Generates new access token using refresh token.
 *     tags: [Auth]
 *
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *
 *       401:
 *         description: Invalid refresh token
 */
router.route("/refresh-token")
    .post(refreshAccessToken);



export default router;