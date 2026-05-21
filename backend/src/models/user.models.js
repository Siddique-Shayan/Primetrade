import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import { Env } from "../config/env.config.js";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next;
  this.password = await bcrypt.hash(this.password, 10);
  next;
});

userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      role: this.role,
    },
    Env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: Env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    {
      _id: this._id,
    },
    Env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: Env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
