import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { webhookUrl } from "../controllers/webhook.controller.js";
import { loginUser, registerUser } from "../controllers/user.controller.js";

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

//router.post("/register", registerUser);

export default router;
