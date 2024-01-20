import { Comment } from "../models/comment.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const comment = Comment.find({ video: videoId })
    .projection({})
    .sort({ _id: -1 })
    .limit(10);
  return res.status(200).json(new ApiResponse(200, comment, "All Comments"));
});

const addComment = asyncHandler(async (req, res) => {
  const { content, video, owner } = req.body;
  const existedOwner = await User.findById(owner);
  if (!existedOwner) {
    throw new ApiError(409, "owner not exists");
  }
  const comment = await Comment.create({ content, video, owner });
  if (!comment) {
    throw new ApiError(500, "Something went wrong");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, comment, "Comment Added Successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        comment: req.body.comment,
      },
    },
    { new: true }
  ).select("-owner -video");
  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findByIdAndDelete({ _id: commentId });
  return res
    .status(201)
    .json(new ApiResponse(200, {}, "Comment Delete Successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
