import { body } from "express-validator";

export const userRegistrationValidator = () => {
  return [
    body("userName")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be between 3 and 20 characters")
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage(
        "Username can only contain letters, numbers and underscores"
      ),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number"),

    body("role")
      .trim()
      .notEmpty()
      .withMessage("Role is required")
      .isIn(["admin", "user"])
      .withMessage("Role must be either admin or user"),
  ];
};

export const userLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email"),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required"),

    body("role")
      .trim()
      .notEmpty()
      .withMessage("Role is required")
      .isIn(["admin", "user"])
      .withMessage("Invalid role"),
  ];
};
