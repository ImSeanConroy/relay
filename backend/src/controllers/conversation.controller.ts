import { Request, Response } from "express";
import Conversation from "../repositories/conversation.repository.js";
import { asyncHandler } from "../middleware/async-handler.js";
import { HTTPSTATUS } from "../constants/http.config.js";
import {
  createConversation,
  deleteConversation,
  updateConversation,
} from "../services/conversation.service.js";
import {
  createConversationSchema,
  updateConversationSchema,
} from "../common/schemas/conversation.schemas.js";
import { NotFoundException } from "../utils/catch-error.js";
import { ErrorCode } from "../common/enums/error-code.enum.js";

/**
 * @description   Create conversation
 * @route         POST /api/conversations
 * @access        Private
 */
export const createConversationHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // Validate Request
    const request = createConversationSchema.parse(req.body);

    // Call Service
    const conversation = await createConversation({
      name: request.type === "direct" ? null : request.name!,
      type: request.type,
      requesterId: req.user.id,
    });

    // Return Response
    res.status(201).json({
      message: "converstion created successfully",
      data: conversation.id,
    });
  }
);

/**
 * @description   Retrieve all conversations for a user
 * @route         GET /api/conversations
 * @access        Private
 */
export const getConversationsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const conversations = await Conversation.getByUserId(req.user.id);

    // Return Response
    return res.status(HTTPSTATUS.OK).json({
      data: conversations,
    });
  }
);

/**
 * @description   Get single conversation
 * @route         GET /api/conversations/:conversationId
 * @access        Private
 */
export const getConversationHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const conversation = await Conversation.getById(req.params.conversationId);
    if (!conversation) {
      throw new NotFoundException("User not found", ErrorCode.AUTH_NOT_FOUND);
    }

    // Return Response
    return res.status(HTTPSTATUS.CREATED).json({
      data: conversation,
    });
  }
);

/**
 * @description   Update conversation
 * @route         PUT /api/conversation/:conversationId
 * @access        Private
 */
export const updateConversationHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // Validate Request
    const request = updateConversationSchema.parse(req.body);
    const conversationId = req.params.conversationId;

    // Call Service
    const conversation = await updateConversation(conversationId, request);

    // Return Response
    return res.status(HTTPSTATUS.CREATED).json({
      message: "Conversation updated successfully",
      data: conversation,
    });
  }
);

/**
 * @description   Delete conversation
 * @route         DELETE /api/conversation/:conversationId
 * @access        Private
 */
export const deleteConversationHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const conversationId = req.params.conversationId;

    // Call Service
    await deleteConversation(conversationId);

    // Return Response
    return res.status(HTTPSTATUS.CREATED).json({
      message: "Conversation deleted successfully",
    });
  }
);
