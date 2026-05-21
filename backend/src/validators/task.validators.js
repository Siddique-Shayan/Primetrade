import { body } from "express-validator";

export const createTaskValidator = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Task name is required")
      .isLength({ min: 3, max: 50 })
      .withMessage("Task name must be between 3 and 50 characters"),

    body("description")
      .optional()
      .trim()
      .isLength({ max: 300 })
      .withMessage("Description cannot exceed 300 characters"),
  ];
};

export const updateTaskValidator = () => {
  return [
    body("name")
      .optional()
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage("Task name must be between 3 and 50 characters"),

    body("description")
      .optional()
      .trim()
      .isLength({ max: 300 })
      .withMessage("Description cannot exceed 300 characters"),
  ];
};
