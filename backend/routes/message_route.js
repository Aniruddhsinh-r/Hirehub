import express from "express"
import Authentication from "../middlewares/Authentication.js"
import { sendMessage, getMessages, getConversations } from "../controllers/message_controller.js"

const router = express.Router()

router.route("/send/:id").post(Authentication, sendMessage)
router.route("/conversations").get(Authentication, getConversations)
router.route("/:id").get(Authentication, getMessages)

export default router