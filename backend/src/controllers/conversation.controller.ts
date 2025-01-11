import { Request, Response } from "express";
import conversationService from "../services/conversation.service.js";

// @description   Create conversation between users (DM or Group)
// @route         POST /api/conversation
// @access        Private
export const createConversation = async (req: Request, res: Response) => {
  const { conversationType, name, userIds } = req.body;
  userIds.push(req.user.id)

  try {
    const conversation = await conversationService.create(conversationType, name);
    const conversationId = conversation.id;

    for (let userId of userIds) {
      await conversationService.addUser(conversationId, userId);
    }

    res.status(201).json({ conversationId });
  } catch (err) {
    res.status(500).json({ error: 'Error creating conversation' });
  }
};

// // @description   Retrieve all conversations for a user
// // @route         GET /api/conversation
// // @access        Private
export const getUserConversations = async (req: Request, res: Response) => {
  const userId = req.user.id;
  try {
    const conversations = await conversationService.findByUser(userId);
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching conversations' });
  }
};

// // @description   Add a user to an existing group conversation
// // @route         POST /api/conversation/users
// // @access        Private
export const addUserToConversation = async (req: Request, res: Response) => {
  const { conversationId, userId } = req.body;

  try {
    await conversationService.addUser(conversationId, userId);
    res.status(200).json({ message: 'User added to conversation' });
  } catch (err) {
    res.status(400).json({ error: "Error adding user to conversation" });
  }
};

// // @description   Remove a user from a group conversation
// // @route         DELETE /api/conversation/users
// // @access        Private
export const removeUserFromConversation = async (req: Request, res: Response) => {
  const { conversationId, userId } = req.body;

  try {
    await conversationService.removeUser(conversationId, userId);
    res.status(200).json({ message: 'User removed from conversation' });
  } catch (err) {
    res.status(400).json({ error: "Error removing user to conversation" });
  }
};

// // @description   Delete a conversation
// // @route         DELETE /api/conversation/:conversationId
// // @access        Private
export const deleteConversation = async (req: Request, res: Response) => {
  const { conversationId } = req.params;

  try {
    await conversationService.hardDelete(conversationId);
    res.status(200).json({ message: 'Conversation deleted' });
  } catch (err) {
    res.status(400).json({ error: "Error deleting conversation" });
  }
};

export default {}