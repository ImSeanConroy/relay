import express from "express";
import {
  createConversationHandler,
  getConversationsHandler,
  getConversationHandler,
  updateConversationHandler,
  deleteConversationHandler,
} from "../controllers/conversation.controller.js";
import protectRoute from "../middleware/protect-route.js";
import verifyParticipant from "../middleware/verify-participant.js";

const router = express.Router();

router.get("/", protectRoute, getConversationsHandler);
router.post("/", protectRoute, createConversationHandler);
router.get("/:conversationId", protectRoute, verifyParticipant, getConversationHandler);
router.put("/:conversationId", protectRoute, verifyParticipant, updateConversationHandler);
router.delete("/:conversationId", protectRoute, verifyParticipant, deleteConversationHandler);

export default router;
