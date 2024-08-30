import { Router } from "express";
import { ApplyJob, GetApplications, getApplicants, updateApplicationStatus } from "../controllers/application.controller.js"
import { verifyToken } from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/ApplyJob/:jobId").post(verifyToken, ApplyJob)
router.route("/GetApplications").get(verifyToken, GetApplications)
router.route("/:id/getApplicants").get(verifyToken, getApplicants)
router.route("/status/:applicationId/updateApplicationStatus").put(verifyToken, updateApplicationStatus)

export default router;