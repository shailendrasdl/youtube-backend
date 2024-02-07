import { Router } from "express";
import { promisesAll } from "../controllers/practice.controller.js";

const router = Router();

router.route("/all").get(promisesAll);

export default router;
