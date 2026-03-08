import express, { Router } from "express"
import { login, logout, register, updateProfile, } from "../controllers/user_controller.js"
import Authentication from "../middlewares/Authentication.js"
import { singleUpload } from "../middlewares/Multer.js"

const router = express.Router()

router.route("/register").post(singleUpload,register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/update").post(Authentication,singleUpload,updateProfile)


export default router
