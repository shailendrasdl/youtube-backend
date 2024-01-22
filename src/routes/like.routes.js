import { Router } from "express";
import {
  getLikedVideos,
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
// Apply verifyJWT middleware to all routes in this file
router.use(verifyJWT);

router.route("/videos").get(getLikedVideos);
router.route("/toggle/video/:videoId").post(toggleVideoLike);
router.route("/toggle/tweet/:tweetId").post(toggleTweetLike);
router.route("/toggle/comment/:commentId").post(toggleCommentLike);

export default router;
