import express from "express";
import {
  createConversationHandler,
} from "../controllers/conversation.controller.js";
import protectRoute from "../middleware/protect-route.js";

const router = express.Router();

// router.get("/", protectRoute, getUserConversations);

router.post("/", protectRoute, createConversationHandler);
// Update Conversation
// router.delete("/:conversationId", protectRoute, deleteConversation);

// router.post("/users", protectRoute, addUserToConversation);
// router.delete("/users", protectRoute, removeUserFromConversation);


export default router;
