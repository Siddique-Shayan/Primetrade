import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import { HttpStatusCode } from "axios";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];

  errors.array().map(err =>
    extractedErrors.push({
      [err.path]: err.msg,
    })
  );

  throw new ApiError(
    HttpStatusCode.UnprocessableEntity,
    "Received data is not valid",
    extractedErrors
  );
};
