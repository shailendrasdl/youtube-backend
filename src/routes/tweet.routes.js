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
router.route("/:tweetId").patch(updateTweet);
router.route("/:tweetId").patch(deleteTweet);
router.route("/user/:userId").get(getUserTweets);

export default router;
