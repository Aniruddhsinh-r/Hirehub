import express, { Router } from "express"
import Authentication from "../middlewares/Authentication.js"
import { applyJob, getApplicants, getAppliedJob, getRecruiterApplications, sendInterviewEmail, updateStatus } from "../controllers/application_controller.js"


const router = express.Router()

router.route("/apply/:id").get(Authentication,applyJob)
router.route("/get").get(Authentication,getAppliedJob)
router.route("/:id/applicants").get(Authentication,getApplicants)
router.route("/status/:id/update").post(Authentication,updateStatus)
router.route("/recruiter/get").get(Authentication, getRecruiterApplications)
router.post("/email/:id", Authentication, sendInterviewEmail)

export default router;