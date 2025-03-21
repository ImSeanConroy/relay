import { Request, Response } from "express";
import generateToken from "../utils/generate-token.js";
import {
  createUser,
  loginUser,
  resetPassword,
  sendPasswordResetEmail,
  verifyEmailService,
} from "../services/user.service.js";
import { asyncHandler } from "../middleware/async-handler.js";
import { HTTPSTATUS } from "../constants/http.config.js";
import {
  emailSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  verificationCodeSchema,
} from "../common/schemas/auth.schemas.js";

/**
 * @description   Signup user and send email verification
 * @route         POST /api/auth/signup
 * @access        Public
 */
export const signupHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // Validate Request
    const request = signupSchema.parse(req.body);

    // Call Service
    await createUser(
      request.fullname,
      request.email,
      request.password
    );

    // Return Response
    return res.status(HTTPSTATUS.CREATED).json({
      message: "User registered successfully",
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
    const user = await loginUser(request.email, request.password);

    // Return Response
    generateToken(user.id, res);
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

/**
 * @description   Verify user email
 * @route         POST /api/auth/verify-email
 * @access        Public
 */
export const verifyEmailHandler = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    // Validate Request
    const verificationCode = verificationCodeSchema.parse(req.params.code);

    // Call Service
    await verifyEmailService(verificationCode);

    // Return Response
    return res.status(HTTPSTATUS.OK).json({
      message: "Email verified successfully",
    });
  }
);

// /**
//  * @description   Send password reset email
//  * @route         POST /api/auth/password-forgot
//  * @access        Public
//  */
export const forgotPasswordHandler = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    // Validate Request
    const email = emailSchema.parse(req.body.email);

    // Call Service
    await sendPasswordResetEmail(email);

    // Return Response
    return res.status(HTTPSTATUS.OK).json({
      message: "Password reset sent successfully",
    });
  }
);

/**
 * @description   Reset user password
 * @route         POST /api/auth/password-reset
 * @access        Public
 */
export const passwordResetHandler = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    // Validate Request
    const { password, verificationCode } = resetPasswordSchema.parse(req.body);

    // Call Service
    await resetPassword(password, verificationCode);

    // Return Response
    return res.status(HTTPSTATUS.OK).json({
      message: "Password reset successfully",
    });
  }
);
