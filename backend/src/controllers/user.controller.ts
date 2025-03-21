import { Request, Response } from "express";
import { NotFoundException } from "../utils/catch-error.js";
import { ErrorCode } from "../common/enums/error-code.enum.js";
import { asyncHandler } from "../middleware/async-handler.js";
import { HTTPSTATUS } from "../constants/http.config.js";
import User from "../repositories/user.repository.js";
import { hardDeleteUser, updateUser } from "../services/user.service.js";
import { userSchema } from "./user.schemas.js";

/**
 * @description   Get user profile
 * @route         GET /api/user/profile
 * @access        Public
 */
export const getUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.getById(req.user.id);
    if (!user) {
      throw new NotFoundException("User not found", ErrorCode.AUTH_NOT_FOUND);
    }

    // Return Response
    return res.status(HTTPSTATUS.CREATED).json({
      data: user,
    });
  }
);

/**
 * @description   Update user profile
 * @route         PUT /api/user/profile
 * @access        Private
 */
export const updateUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // Validate Request
    const request = userSchema.parse(req.body);
    const userId = req.user.id;

    // Call Service
    const user = await updateUser(userId, request);

    // Return Response
    return res.status(HTTPSTATUS.CREATED).json({
      message: "User update successfully",
      data: user,
    });
  }
);

/**
 * @description   Delete user profile
 * @route         DELETE /api/user/profile
 * @access        Private
 */
export const deleteUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    await hardDeleteUser(userId);

    // Return Response
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "User deleted successfully" });
  }
);
