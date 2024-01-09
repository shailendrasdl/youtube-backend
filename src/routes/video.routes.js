import { Router } from "express";
import { getAllVideos } from "../controllers/video.controller.js";

const router = Router();

router.route("/videoList").get(getAllVideos);

export default router;
