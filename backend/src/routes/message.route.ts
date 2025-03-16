import express from "express"
import protectRoute from "../middleware/protect-route.js"
import { sendMessage, getMessages, updateMessage, deleteMessage } from "../controllers/message.controller.js"

const router = express.Router()

router.get("/:conversationId", protectRoute, getMessages)
router.post("/:conversationId", protectRoute, sendMessage)
router.put("/:messageId", protectRoute, updateMessage)
router.delete("/:messageId", protectRoute, deleteMessage)

export default router