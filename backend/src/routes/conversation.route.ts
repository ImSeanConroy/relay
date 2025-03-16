import express from "express";
import protectRoute from "../middleware/protect-route.js";
import {
  addUserToConversation,
  createConversation,
  deleteConversation,
  getUserConversations,
  removeUserFromConversation,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.post("/", protectRoute, createConversation);
router.get("/", protectRoute, getUserConversations);
router.post("/users", protectRoute, addUserToConversation);
router.delete("/users", protectRoute, removeUserFromConversation);
router.delete("/:conversationId", protectRoute, deleteConversation);

export default router;
