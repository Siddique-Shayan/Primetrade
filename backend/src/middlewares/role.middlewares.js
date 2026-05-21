import { HTTPSTATUS } from "../config/http.config.js";
import { ApiError } from "../utils/ApiError.js";

export const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(HTTPSTATUS.UNAUTHORIZED, "Unauthorized access");
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(HTTPSTATUS.FORBIDDEN, "Access denied");
    }

    next();
  };
};
