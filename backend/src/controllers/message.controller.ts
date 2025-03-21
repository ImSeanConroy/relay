// import { Request, Response } from "express";
// import { getIO } from "../socket/socket-context.js";
// import { getReceiverSocketId } from "../socket/socket.js";
// import messageService from "../services/message.service.js";
// import conversationService from "../services/conversation.service.js";
// import { asyncHandler } from "../middleware/async-handler.js";

// /**
//  * @description   Create a new message
//  * @route         POST /api/messages/:conversationId
//  * @access        Private
//  */
// export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
//   const userId = req.user.id;
//   const { conversationId } = req.params;
//   const { body } = req.body;

//   const newMessage = await messageService.create(conversationId, userId, body);

//   const io = getIO();
//   const participants = await conversationService.findUsers(conversationId);

//   participants.forEach((user: any) => {
//     const socketId = getReceiverSocketId(user.id);
//     if (socketId) {
//       io.to(socketId).emit("newMessage", newMessage);
//     }
//   });

//   res.status(201).json(newMessage);
// });

// /**
//  * @description   Update an existing message
//  * @route         PUT /api/messages/:messageId
//  * @access        Private
//  */
// export const updateMessage = asyncHandler(
//   async (req: Request, res: Response) => {
//     const userId = req.user.id;
//     const { messageId } = req.params;
//     const { body } = req.body;

//     const updatedMessage = await messageService.update(messageId, body, userId);

//     res.status(200).json(updatedMessage);
//   }
// );

// /**
//  * @description   Soft delete a message
//  * @route         DELETE /api/messages/:messageId
//  * @access        Private
//  */
// export const deleteMessage = asyncHandler(
//   async (req: Request, res: Response) => {
//     const userId = req.user.id;
//     const { messageId } = req.params;

//     const deletedMessage = await messageService.softDelete(messageId, userId);

//     res.status(200).json(deletedMessage);
//   }
// );

// /**
//  * @description   Retrieve messages for a conversation
//  * @route         GET /api/messages/:conversationId
//  * @access        Private
//  */
// export const getMessages = asyncHandler(async (req: Request, res: Response) => {
//   const userId = req.user.id;
//   const { conversationId } = req.params;

//   const messages = await messageService.findByConversationId(
//     conversationId,
//     userId
//   );

//   res.status(200).json(messages || []);
// });
