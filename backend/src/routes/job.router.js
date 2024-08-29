import { Router } from "express";
import { createJob,getAllJobs,jobsCreatedByAdmin,getJobById } from "../controllers/job.controller.js"
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/createJob").post(verifyToken, createJob)
router.route("/getAllJobs").get(verifyToken, getAllJobs)
router.route("/jobsCreatedByAdmin").get(verifyToken, jobsCreatedByAdmin)
router.route("/getJobById/:id").get(verifyToken, getJobById)

export default router;