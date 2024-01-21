import { Router } from "express";
import { toggleVideoLike } from "../controllers/like.controller.js";

const router = Router();
// Apply verifyJWT middleware to all routes in this file
//router.use(verifyJWT);

router.route("/toggle/v/:videoId").post(toggleVideoLike);

export default router;
