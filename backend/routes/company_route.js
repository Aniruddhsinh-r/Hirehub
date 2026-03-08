import express, { Router } from "express"
import Authentication from "../middlewares/Authentication.js"
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company_controller.js"
import { singleUpload } from "../middlewares/Multer.js"

const router = express.Router()

router.route("/register").post(Authentication,registerCompany)
router.route("/get").get(Authentication,getCompany)
router.route("/get/:id").get(Authentication,getCompanyById)
router.route("/update/:id").put(Authentication,singleUpload,updateCompany)

export default router;