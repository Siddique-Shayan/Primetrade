import { Env } from "../config/env.config.js";
import { HTTPSTATUS } from "../config/http.config.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(HTTPSTATUS.UNAUTHORIZED, "Unauthorized requests");
    }

    const decodedToken = jwt.verify(token, Env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(HTTPSTATUS.UNAUTHORIZED, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(
      HTTPSTATUS.UNAUTHORIZED,
      error?.message || "Invalid access Token"
    );
  }
});

export { verifyJWT };
