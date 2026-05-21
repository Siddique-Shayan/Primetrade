import { Task } from "../models/task.models.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

import { HTTPSTATUS } from "../config/http.config.js";

import { redisClient } from "../config/redis.config.js";

const createTask = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    completed,
  } = req.body;

  if (!name || name.trim() === "") {
    throw new ApiError(
      HTTPSTATUS.BAD_REQUEST,
      "Task name is required"
    );
  }

  const task = await Task.create({
    name,
    description,
    completed,
    owner: req.user._id,
  });

  // CLEAR REDIS CACHE
  await redisClient.del(
    `tasks:${req.user._id}`
  );

  return res
    .status(HTTPSTATUS.CREATED)
    .json(
      new ApiResponse(
        HTTPSTATUS.CREATED,
        task,
        "Task created successfully"
      )
    );
});

const getAllTasks = asyncHandler(async (req, res) => {

    const cacheKey = `tasks:${req.user._id}`;

    
    const cachedTasks = await redisClient.get(cacheKey);
    if (cachedTasks) {
        return res.status(HTTPSTATUS.OK).json(
            new ApiResponse(
                HTTPSTATUS.OK,
                JSON.parse(cachedTasks),
                "Tasks fetched from Redis cache"
            )
        );
    }

    const tasks = await Task.find({
        owner: req.user._id
    }).sort({ createdAt: -1 });


    await redisClient.set(
        cacheKey,
        JSON.stringify(tasks),
        {
            EX: 60
        }
    );

    return res.status(HTTPSTATUS.OK).json(
        new ApiResponse(
            HTTPSTATUS.OK,
            tasks,
            "Tasks fetched successfully"
        )
    );
});



const getSingleTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  if (!task) {
    throw new ApiError(HTTPSTATUS.NOT_FOUND, "Task not found");
  }

  if (task.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(HTTPSTATUS.FORBIDDEN, "Access denied");
  }

  return res
    .status(HTTPSTATUS.OK)
    .json(new ApiResponse(HTTPSTATUS.OK, task, "Task fetched successfully"));
});

const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const {
    name,
    description,
    completed,
  } = req.body;

  const task = await Task.findById(id);

  if (!task) {
    throw new ApiError(
      HTTPSTATUS.NOT_FOUND,
      "Task not found"
    );
  }

  if (
    task.owner.toString() !==
    req.user._id.toString()
  ) {
    throw new ApiError(
      HTTPSTATUS.FORBIDDEN,
      "Access denied"
    );
  }

  task.name = name || task.name;

  task.description =
    description ?? task.description;

  task.completed =
    completed ?? task.completed;

  await task.save();

  // CLEAR REDIS CACHE
  await redisClient.del(
    `tasks:${req.user._id}`
  );

  return res
    .status(HTTPSTATUS.OK)
    .json(
      new ApiResponse(
        HTTPSTATUS.OK,
        task,
        "Task updated successfully"
      )
    );
});

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    throw new ApiError(HTTPSTATUS.NOT_FOUND, "Task not found");
  }

  if (
    task.owner.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new ApiError(HTTPSTATUS.FORBIDDEN, "Access denied");
  }

  await task.deleteOne();

  await redisClient.del(
    `tasks:${req.user._id}`
  );

  return res
    .status(HTTPSTATUS.OK)
    .json(new ApiResponse(HTTPSTATUS.OK, {}, "Task deleted successfully"));
});

export { createTask, getAllTasks, getSingleTask, updateTask, deleteTask };
