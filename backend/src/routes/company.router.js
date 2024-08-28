import { Router } from "express";
import { registerCompany, getCompanies, getCompanyByID, updateCompanyData } from "../controllers/company.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js"

const router = Router()


router.route("/companyregister").post(verifyToken,registerCompany)
router.route("/getCompanies").get(verifyToken,getCompanies)
router.route("/getCompanyByID/:id").get(verifyToken, getCompanyByID)
router.route("/updateCompanyData/:id").post(verifyToken, updateCompanyData)


export default router;