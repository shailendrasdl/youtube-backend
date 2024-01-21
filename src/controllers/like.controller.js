import mongoose, { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Like } from "../models/like.model.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  /* TODO: toggle like on video */

  const { videoId } = req.params;
  if (isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {});

const toggleTweetLike = asyncHandler(async (req, res) => {});

const getLikedVideos = asyncHandler(async (req, res) => {});

export { toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideos };
