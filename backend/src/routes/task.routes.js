import { Router } from "express";

import {
    createTask,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask,
} from "../controllers/task.controllers.js";

import { verifyJWT } from "../middlewares/auth.middlewares.js";

import {
    createTaskValidator,
    updateTaskValidator,
} from "../validators/task.validators.js";

import { validate } from "../middlewares/validation.middlewares.js";

const router = Router();


// ================= PROTECTED ROUTES =================

router.use(verifyJWT);




/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task for the authenticated user.
 *     tags: [Tasks]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - name
 *
 *             properties:
 *               name:
 *                 type: string
 *                 example: Complete backend assignment
 *
 *               description:
 *                 type: string
 *                 example: Finish Redis and Swagger integration
 *
 *     responses:
 *       201:
 *         description: Task created successfully
 *
 *       400:
 *         description: Validation failed
 *
 *       401:
 *         description: Unauthorized
 *
 *       409:
 *         description: Task already exists
 */
router.route("/")
    .post(
        createTaskValidator(),
        validate,
        createTask
    );




/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Fetches all tasks belonging to the authenticated user.
 *     tags: [Tasks]
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
 */
router.route("/")
    .get(getAllTasks);




/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get single task
 *     description: Fetch a single task using task ID.
 *     tags: [Tasks]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Task fetched successfully
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
router.route("/:id")
    .get(getSingleTask);




/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update task
 *     description: Updates task details using task ID.
 *     tags: [Tasks]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Task Name
 *
 *               description:
 *                 type: string
 *                 example: Updated task description
 *
 *     responses:
 *       200:
 *         description: Task updated successfully
 *
 *       400:
 *         description: Validation failed
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
router.route("/:id")
    .patch(
        updateTaskValidator(),
        validate,
        updateTask
    );




/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     description: Deletes task using task ID. Only task owner or admin can delete.
 *     tags: [Tasks]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
router.route("/:id")
    .delete(deleteTask);



export default router;