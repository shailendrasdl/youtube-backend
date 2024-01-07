import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { webhookUrl } from "../controllers/webhook.controller.js";
import {
  changeCurrentPassword,
  forgotPassword,
  getCurrentUser,
  getUserChannelProfile,
  loginUser,
  logoutUser,
  refereshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/webhook").post(webhookUrl);

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refereshAccessToken);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/forgot-password").patch(forgotPassword);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);
  router.route("/getUserChannelProfile").get(verifyJWT, getUserChannelProfile)


export default router;
