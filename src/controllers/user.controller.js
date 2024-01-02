import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  console.log(" call registerUser controller");
  return res.status(200).json({ message: "OK" });
});

const loginUser = asyncHandler(async (req, res) => {
  console.log(" call login controller");
  return res.status(200).json({ message: "OK" });
});

const logoutUser = asyncHandler(async (req, res) => {});

export { registerUser, loginUser };
