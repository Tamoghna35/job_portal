import { Router } from "express";
import { ApplyJob } from "../controllers/application.controller.js"
import { verifyToken } from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/ApplyJob").post(verifyToken, ApplyJob)

export default router;