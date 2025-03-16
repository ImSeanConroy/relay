import { Request, Response } from "express";
import generateToken from "../utils/generate-token.js";
import { createUser, loginUser } from "../services/user.service.js";
import { asyncHandler } from "../middleware/async-handler.js";
import { HTTPSTATUS } from "../constants/http.config.js";
import { loginSchema, signupSchema } from "./auth.schemas.js";

/**
 * @description   Signup user
 * @route         POST /api/auth/signup
 * @access        Public
 */
export const signupHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // Validate Request
    const request = signupSchema.parse(req.body);

    // Call Service
    const user = await createUser(request);

    // Return Response
    return res.status(HTTPSTATUS.CREATED).json({
      message: "User registered successfully",
      data: user,
    });
  }
);

/**
 * @description   Login user
 * @route         POST /api/auth/login
 * @access        Public
 */
export const loginHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // Validate Request
    const request = loginSchema.parse(req.body);

    // Call Service
    const user = await loginUser(request);

    // Return Response
    generateToken(user.user.id, res)
    return res.status(HTTPSTATUS.CREATED).json({
      message: "User login successfully",
      data: user,
    });
  }
);

/**
 * @description   Logout user
 * @route         POST /api/auth/logout
 * @access        Public
 */
export const logoutHandler = asyncHandler(
  async (req: Request, res: Response) => {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  }
);