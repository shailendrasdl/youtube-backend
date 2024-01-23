import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createTweet,
  deleteTweet,
  getUserTweets,
  updateTweet,
} from "../controllers/tweet.controller.js";

const router = Router();
router.use(verifyJWT, upload.none());

router.route("/").post(createTweet);
router.route("/updateTweet/:tweetId").patch(updateTweet);
router.route("/deleteTweet/:tweetId").delete(deleteTweet);
router.route("/user/:userId").get(getUserTweets);

export default router;
