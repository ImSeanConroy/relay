import { query } from "../config/db.js";
import { Request, Response, NextFunction } from "express";
import {
  NotFoundException,
} from "../utils/catch-error.js";
import { asyncHandler } from "./async-handler.js";

/**
 * Middleware to protect conversation routes.
 * It checks the user is part of the conversation they are attempting to,
 * get, update, or delete.
 *
 * @param req - The Express request object
 * @param res - The Express response object
 * @param next - The next middleware function
 */
const verifyParticipant = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await query(
      "SELECT * FROM conversation_participants WHERE conversation_id = $1 AND user_id = $2",
      [req.params.conversationId, req.user.id]
    );

    if (result.rows.length === 0) {
      throw new NotFoundException("Conversation not found");
    }

    next();
  }
);

export default verifyParticipant;
