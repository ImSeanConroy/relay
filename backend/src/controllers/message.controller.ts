import { Request, Response } from "express";
import { getIO } from "../socket/socket-context.js";
import { getReceiverSocketId } from "../socket/socket.js";
import messageService from "../services/message.service.js";
import conversationService from "../services/conversation.service.js";

// @description   Create message
// @route         POST /api/messages/:conversationId
// @access        Private
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { conversationId } = req.params;
    const { body } = req.body;

    const newMessage = await messageService.create(
      conversationId,
      userId,
      body
    );

    const io = getIO()
    const conversationParticipants = await conversationService.findUsers(conversationId)
    conversationParticipants.map((user: any) => {
      const socketId = getReceiverSocketId(user.id)
      if (socketId) {
        io.to(socketId).emit("newMessage", newMessage)
      }
    })

    res.status(201).json(newMessage);
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @description   Update message
// @route         PUT /api/messages/:messageId
// @access        Private
export const updateMessage = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { messageId } = req.params;
    const { body } = req.body;

    const newMessage = await messageService.udpate(
      messageId,
      body
    );

    res.status(201).json(newMessage);
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @description   Delete message
// @route         DELETE /api/messages/:messageId
// @access        Private
export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { messageId } = req.params;

    const newMessage = await messageService.softDelete(
      messageId,
    );

    res.status(201).json(newMessage);
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @description   Get messages
// @route         GET /api/messages/:conversationId
// @access        Private
export const getMessages = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { conversationId } = req.params;

    const messages = await messageService.findByConversationId(conversationId);

    if (!messages) {
      res.status(200).json([]);
      return;
    }

    res.status(200).json(messages);
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
