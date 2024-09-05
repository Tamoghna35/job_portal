import { Router } from "express";
import { loginUser, logoutUser, registerUser, updateUser } from "../controllers/user.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js"
import { singleUpload } from "../middlewares/multer.js";

const router = Router()

router.route("/register").post(singleUpload,registerUser)
router.route("/loginUser").post(loginUser)
router.route("/logoutUser").post(verifyToken, logoutUser)
router.route("/updateUser").post(verifyToken, updateUser)//Facing error  need to solve

export default router;
