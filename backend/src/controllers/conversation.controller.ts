import { Request, Response } from "express";
import conversationService from "../services/conversation.service.js";
import { asyncHandler } from "../middleware/async-handler.js";

/**
 * @description   Create conversation
 * @route         POST /api/conversations
 * @access        Private
 */
export const createConversationHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { conversationType, name, userIds } = req.body;
    const requesterId = req.user.id;
    
    const conversation = await conversationService.create(
      conversationType,
      name,
      requesterId,
    );
    const conversationId = conversation.id;

    for (let userId of userIds) {
      await conversationService.addUser(conversationId, userId, requesterId);
    }

    res.status(201).json({ conversationId });
  }
);

// /**
//  * @description   Retrieve all conversations for a user
//  * @route         GET /api/conversations
//  * @access        Private
//  */
// export const getUserConversations = asyncHandler(
//   async (req: Request, res: Response) => {
//     const userId = req.user.id;
//     const conversations = await conversationService.findByUser(userId);
//     res.json(conversations);
//   }
// );

// /**
//  * @description   Add a user to an existing group conversation
//  * @route         POST /api/conversation/users
//  * @access        Private
//  */
// export const addUserToConversation = asyncHandler(
//   async (req: Request, res: Response) => {
//     const { conversationId, userId } = req.body;
//     const requesterId = req.user.id;

//     await conversationService.addUser(conversationId, userId, requesterId);
//     res.status(200).json({ message: "User added to conversation" });
//   }
// );

// /**
//  * @description   Remove a user from a group conversation
//  * @route         DELETE /api/conversation/users
//  * @access        Private
//  */
// export const removeUserFromConversation = asyncHandler(
//   async (req: Request, res: Response) => {
//     const { conversationId, userId } = req.body;
//     const requesterId = req.user.id;

//     await conversationService.removeUser(conversationId, userId, requesterId);
//     res.status(200).json({ message: "User removed from conversation" });
//   }
// );

// /**
//  *  * @description   Delete a conversation
//  *  * @route         DELETE /api/conversation/:conversationId
//  *  * @access        Private
//  */
// export const deleteConversation = asyncHandler(
//   async (req: Request, res: Response) => {
//     const { conversationId } = req.params;

//     await conversationService.hardDelete(conversationId);
//     res.status(200).json({ message: "Conversation deleted" });
//   }
// );
