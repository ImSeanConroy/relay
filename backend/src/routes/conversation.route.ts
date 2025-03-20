import express from "express";
import {
  createConversationHandler,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.post("/", createConversationHandler);
// router.get("/", protectRoute, getUserConversations);
// router.post("/users", protectRoute, addUserToConversation);
// router.delete("/users", protectRoute, removeUserFromConversation);
// router.delete("/:conversationId", protectRoute, deleteConversation);

export default router;
