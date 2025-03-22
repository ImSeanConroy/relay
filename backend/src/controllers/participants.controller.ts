import { asyncHandler } from "../middleware/async-handler.js";
import { Request, Response } from "express";
import { addUsers, removeUsers } from "../services/participant.service.js";
import { participantsSchema } from "../common/schemas/participants.schema.js";

/**
 * @description   Add users to a conversation
 * @route         POST /api/participants
 * @access        Private
 */
export const addParticipantsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // Validate Request
    const request = participantsSchema.parse(req.body);

    // // Call Service
    await addUsers(request.conversationId, request.userIds)

    // Return Response
    res.status(201).json({
      message: "participants added to conversation successfully",
    });
  }
);

/**
 * @description   Remove users from a conversation
 * @route         DELETE /api/participants
 * @access        Private
 */
export const removeParticipantsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // Validate Request
    const request = participantsSchema.parse(req.body);

    // // Call Service
    await removeUsers(request.conversationId, request.userIds)

    // Return Response
    res.status(201).json({
      message: "participants removed to conversation successfully",
    });
  }
);