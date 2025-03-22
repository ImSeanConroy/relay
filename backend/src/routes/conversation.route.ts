import express from "express";
import {
  createConversationHandler,
  getConversationsHandler,
  getConversationHandler,
  updateConversationHandler,
  deleteConversationHandler,
} from "../controllers/conversation.controller.js";
import verifyParticipant from "../middleware/verify-participant.js";

const router = express.Router();

router.get("/", getConversationsHandler);
router.post("/", createConversationHandler);
router.get("/:conversationId", verifyParticipant, getConversationHandler);
router.put("/:conversationId", verifyParticipant, updateConversationHandler);
router.delete("/:conversationId", verifyParticipant, deleteConversationHandler);

export default router;
