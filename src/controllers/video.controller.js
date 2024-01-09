import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllVideos = asyncHandler(async (req, res) => {
  console.log("-- call api --");
  const video = await Video.find();
  console.log("video :", video);
  return res.status(200).json(new ApiResponse(200, video, "All Videos"));
});

const publishVideo = asyncHandler(async (req, res) => {
  console.log("-- call api --");
});

export { getAllVideos, publishVideo };
