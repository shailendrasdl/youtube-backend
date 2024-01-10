import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getAllVideos = asyncHandler(async (req, res) => {
  //const supportChat_list = await Support_chat.find({"ticket": req.params.postId}).sort({"updated_at": 1});
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  console.log("-- call api --");
  const video = await Video.find().sort({ updatedAt: 1 }).limit(10);
  console.log("video :", video);
  return res.status(200).json(new ApiResponse(200, video, "All Videos"));
});

const publishVideo = asyncHandler(async (req, res) => {
  const { title, description, duration } = req.body;
  if ([title, description, duration].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  console.log("videoFile: ", req.files?.videoFile[0]);
  const videoFileLocalPath = req.files?.videoFile[0]?.path;
  if (!videoFileLocalPath) {
    throw new ApiError(400, "videoFile File is required");
  }
  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
  if (!thumbnailLocalPath) {
    throw new ApiError(400, "thumbnail File is required");
  }
  const videoFile = await uploadOnCloudinary(videoFileLocalPath);
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  if (!videoFile) {
    throw new ApiError(400, "Avatar File is required");
  }
  if (!thumbnail) {
    throw new ApiError(400, "Avatar File is required");
  }
  const createVideo = await Video.create({
    title,
    description,
    videoFile: videoFile.url,
    thumbnail: thumbnail.url,
    size: videoFile.size,
    duration,
    isPublished: true,
    owner: req.user._id,
  });
  if (!createVideo) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createVideo, "Video Publish Successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const video = await Video.findOne(_id);

  let newPublished;
  if (video.isPublished === true) {
    newPublished = false;
  } else {
    newPublished = true;
  }
  video.isPublished = newPublished;
  await video.save({ validateBeforeSave: false });
  return res
    .status(201)
    .json(
      new ApiResponse(200, newPublished, "isPublished update Successfully")
    );
});

export { getAllVideos, publishVideo, togglePublishStatus };
