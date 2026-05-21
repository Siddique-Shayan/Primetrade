import { HTTPSTATUS } from "../config/http.config.js";

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || HTTPSTATUS.INTERNAL_SERVER_ERROR;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export { globalErrorHandler };
