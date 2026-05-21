import { User } from "../models/user.models.js";
import { Task } from "../models/task.models.js";

import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

import { HTTPSTATUS } from "../config/http.config.js";

// ================= GET ALL USERS =================

const getAllUsers = asyncHandler(
  async (req, res) => {
    if (req.user.role !== "admin") {
      throw new ApiError(
        HTTPSTATUS.FORBIDDEN,
        "Access denied"
      );
    }

    const users = await User.find()
      .select("-password -refreshToken")
      .sort({
        createdAt: -1,
      });

    return res
      .status(HTTPSTATUS.OK)
      .json(
        new ApiResponse(
          HTTPSTATUS.OK,
          users,
          "Users fetched successfully"
        )
      );
  }
);

// ================= GET ALL TASKS =================

const getAllTasks = asyncHandler(
  async (req, res) => {
    if (req.user.role !== "admin") {
      throw new ApiError(
        HTTPSTATUS.FORBIDDEN,
        "Access denied"
      );
    }

    const tasks = await Task.find()
      .populate(
        "owner",
        "userName email role"
      )
      .sort({
        createdAt: -1,
      });

    return res
      .status(HTTPSTATUS.OK)
      .json(
        new ApiResponse(
          HTTPSTATUS.OK,
          tasks,
          "All tasks fetched successfully"
        )
      );
  }
);

// ================= DELETE ANY TASK =================

const deleteAnyTask = asyncHandler(
  async (req, res) => {
    if (req.user.role !== "admin") {
      throw new ApiError(
        HTTPSTATUS.FORBIDDEN,
        "Access denied"
      );
    }

    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      throw new ApiError(
        HTTPSTATUS.NOT_FOUND,
        "Task not found"
      );
    }

    await task.deleteOne();

    return res
      .status(HTTPSTATUS.OK)
      .json(
        new ApiResponse(
          HTTPSTATUS.OK,
          {},
          "Task deleted successfully"
        )
      );
  }
);

export {
  getAllUsers,
  getAllTasks,
  deleteAnyTask,
};