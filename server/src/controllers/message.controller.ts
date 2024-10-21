import { Request, Response } from "express";
import prisma from "../db/prisma.js";

// @description   Create message
// @route         GET /api/messages/send/:recieverId
// @access        Private
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const { id:recieverId } = req.params;
    const senderId = req.user.id

    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, recieverId]
        }
      }
    })

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantIds: {
            set: [senderId, recieverId]
          }
        }
      })
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        body: message,
        conversationId: conversation.id
      }
    })

    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: {
          id: conversation.id
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id
            }
          }
        }
      })
    }

    // Socket io will go here

    res.status(201).json(newMessage)

  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @description   Get messages
// @route         GET /api/messages/:userId
// @access        Private
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params
    const senderId = req.user.id

    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, userId]
        }
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc"
          }
        }
      }
    })

    if (!conversation) {
      res.status(200).json([])
      return 
    }

    res.status(200).json(conversation.messages)
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// @description   Get conversations
// @route         GET /api/messages/conversations
// @access        Private
export const getConversations = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: userId
        }
      },
      select: {
        id: true,
        fullname: true,
        profilePicture: true
      }
    })

    res.status(200).json(users)
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}