import express from "express";

import {
  getAllUsers,
  getAllTasks,
  deleteAnyTask,
} from "../controllers/admin.controllers.js";

import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.use(verifyJWT);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management routes
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     description: Returns all registered users. Admin only.
 *     tags: [Admin]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Access denied
 */
router.get("/users", getAllUsers);

/**
 * @swagger
 * /admin/tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Returns all tasks from all users. Admin only.
 *     tags: [Admin]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Access denied
 */
router.get("/tasks", getAllTasks);

/**
 * @swagger
 * /admin/tasks/{id}:
 *   delete:
 *     summary: Delete any task
 *     description: Allows admin to delete any user's task.
 *     tags: [Admin]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *
 *         schema:
 *           type: string
 *
 *         example: 6854d6e58c8d2d2a11f89abc
 *
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Access denied
 *
 *       404:
 *         description: Task not found
 */
router.delete(
  "/tasks/:id",
  deleteAnyTask
);

export default router;