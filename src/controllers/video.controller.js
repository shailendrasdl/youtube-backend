import { asyncHandler } from "../utils/asyncHandler";
import { Video } from "../models/video.model";
import { ApiResponse } from "../utils/ApiResponse";

const getAllVideos = asyncHandler(async (req, res) => {
  const video = await Video.find();
  console.log("video :", video);
  return res.status(200).json(new ApiResponse(200, video, "All Videos"));
});

export { getAllVideos };
