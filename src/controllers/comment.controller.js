//import Comment from "../models/comment.model.js";
import { Comment } from "../models/comment.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const comment = Comment.find({}).projection({}).sort({ _id: -1 }).limit(10);
  return res.status(200).json(new ApiResponse(200, comment, "All Comments"));
});

const addComment = asyncHandler(async (req, res) => {
  const {} = req.body;
  // TODO: add a comment to a video
  const { content, video, owner } = req.body;
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
});

export { getVideoComments, addComment, updateComment, deleteComment };
