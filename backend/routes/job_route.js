import express, { Router } from "express"
import Authentication from "../middlewares/Authentication.js"
import { getAdminJobs, getAllJobs, getJobById, postJob, saveJob, getSavedJobs } from "../controllers/job_controler.js"

const router = express.Router()

router.route("/post").post(Authentication, postJob)
router.route("/get").get(Authentication, getAllJobs)
router.route("/getadminjobs").get(Authentication, getAdminJobs)
router.route("/get/:id").get(Authentication,getJobById)

router.route("/save/:id").post(Authentication, saveJob)
// Get Logged-in User Saved Jobs
router.route("/savedjobs").get(Authentication, getSavedJobs)

export default router;