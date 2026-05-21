import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { HTTPSTATUS } from "../config/http.config.js";
import { OPTIONS } from "../constant.js";

const generateAccessandRefreshTokens = async userId => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(HTTPSTATUS.NOT_FOUND, "User Not Found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("TOKEN ERROR => ", error);

    throw new ApiError(HTTPSTATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password, role } = req.body;

  if ([userName, email, password, role].some(field => field?.trim() === "")) {
    throw new ApiError(HTTPSTATUS.BAD_REQUEST, "All fields are required");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(HTTPSTATUS.CONFLICT, "User Already exists");
  }

  const user = await User.create({
    userName: userName.toLowerCase(),
    email,
    role,
    password,
  });

  const { accessToken, refreshToken } = await generateAccessandRefreshTokens(
    user._id
  );

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(HTTPSTATUS.OK)
    .cookie("accessToken", accessToken, OPTIONS)
    .cookie("refreshToken", refreshToken, OPTIONS)
    .json(
      new ApiResponse(
        HTTPSTATUS.OK,
        {
          user: createdUser,
          accessToken,
          refreshToken,
        },
        "User registered successfully"
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (
    !email ||
    !password ||
    !role ||
    email.trim() === "" ||
    password.trim() === "" ||
    role.trim() === ""
  ) {
    throw new ApiError(HTTPSTATUS.BAD_REQUEST, "All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(HTTPSTATUS.NOT_FOUND, "User doesn't exists");
  }

  if (user.role !== role) {
    throw new ApiError(HTTPSTATUS.UNAUTHORIZED, "Invalid role access");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(HTTPSTATUS.UNAUTHORIZED, "Invalid credentials.");
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(HTTPSTATUS.OK)
    .cookie("accessToken", accessToken, OPTIONS)
    .cookie("refreshToken", refreshToken, OPTIONS)
    .json(
      new ApiResponse(
        HTTPSTATUS.OK,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In successfully"
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(HTTPSTATUS.OK)
    .clearCookie("accessToken", OPTIONS)
    .clearCookie("refreshToken", OPTIONS)
    .json(new ApiResponse(HTTPSTATUS.OK, {}, "User logged Out"));
});

const getMe = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(HTTPSTATUS.NOT_FOUND, "User not found");
  }

  return res
    .status(HTTPSTATUS.OK)
    .json(
      new ApiResponse(HTTPSTATUS.OK, user, "Current user fetched successfully")
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(HTTPSTATUS.UNAUTHORIZED, "Refresh token required");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      Env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(HTTPSTATUS.UNAUTHORIZED, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(
        HTTPSTATUS.UNAUTHORIZED,
        "Refresh token expired or used"
      );
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshTokens(
      user._id
    );

    return res
      .status(HTTPSTATUS.OK)
      .cookie("accessToken", accessToken, OPTIONS)
      .cookie("refreshToken", refreshToken, OPTIONS)
      .json(
        new ApiResponse(
          HTTPSTATUS.OK,
          {
            accessToken,
            refreshToken,
          },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      HTTPSTATUS.UNAUTHORIZED,
      error?.message || "Invalid refresh token"
    );
  }
});

export { registerUser, loginUser, logOutUser, getMe, refreshAccessToken };
