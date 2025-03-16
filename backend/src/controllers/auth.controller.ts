import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import generateImage from "../utils/generate-image.js";
import generateToken from "../utils/generate-token.js";
import userService from "../services/user.service.js";
import { BadRequestException } from "../utils/catch-error.js";
import { ErrorCode } from "../common/error-code.enum.js";
import { asyncHandler } from "../middleware/async-handler.js";

/**
 * @description   Signup user
 * @route         POST /api/auth/signup
 * @access        Public
 */
export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { fullname, email, password, confirmPassword } = req.body;
  if (!fullname || !email || !password || !confirmPassword) {
    throw new BadRequestException(
      "Please fill in all fieldsh",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  if (password !== confirmPassword) {
    throw new BadRequestException(
      "Passwords don't match",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  const user = await userService.findByEmail(email);
  if (user) {
    throw new BadRequestException(
      "Email already in use",
      ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
    );
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const profilePicture = generateImage();

  const newUser = await userService.create(
    fullname,
    email,
    hashedPassword,
    profilePicture
  );
  if (newUser) {
    generateToken(newUser.id, res);

    res.status(201).json({
      id: newUser.id,
      fullname: newUser.fullname,
      email: newUser.email,
      profilePicture: newUser.profilePicture,
      status: newUser.status,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    });
  } else {
    throw new BadRequestException(
      "Invalid user data",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }
});

/**
 * @description   Login user
 * @route         POST /api/auth/login
 * @access        Public
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestException(
      "Please fill in all fieldsh",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  const user = await userService.findByEmail(email);
  if (!user) {
    throw new BadRequestException(
      "Invalid email or password provided",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  const isPasswordCorrect = await bcryptjs.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new BadRequestException(
      "Invalid email or password provided",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  generateToken(user.id, res);

  res.status(201).json({
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    profilePicture: user.profilePicture,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
});

/**
 * @description   Logout user
 * @route         POST /api/auth/logout
 * @access        Public
 */
export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).json({ message: "logged out successfully" });
});

/**
 * @description   Get user profile
 * @route         GET /api/auth/profile
 * @access        Public
 */
export const profile = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.findById(req.user.id);
  if (!user) {
    throw new BadRequestException(
      "Invalid email or password provided",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  res.status(201).json({
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    profilePicture: user.profilePicture,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
});

/**
 * @description   Update user profile
 * @route         PUT /api/auth/profile
 * @access        Private
 */
export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const { fullname, email, profilePicture, status } = req.body;
    const userId = req.user.id;

    if (!fullname && !email && !profilePicture && !status) {
      throw new BadRequestException(
        "No data provided to update",
        ErrorCode.AUTH_USER_NOT_FOUND
      );
    }

    const user = await userService.findById(req.user.id);
    if (!user) {
      throw new BadRequestException(
        "User not found",
        ErrorCode.AUTH_USER_NOT_FOUND
      );
    }

    const updatedUser = await userService.update(
      userId,
      fullname || user.fullname,
      email || user.email,
      profilePicture || user.profilePicture,
      status || user.status
    );

    res.status(200).json({
      id: updatedUser.id,
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
      status: updatedUser.status,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    });
  }
);

/**
 * @description   Delete user profile
 * @route         DELETE /api/auth/profile
 * @access        Private
 */
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const user = await userService.findById(userId);
  if (!user) {
    throw new BadRequestException(
      "User not found",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  await userService.hardDelete(userId);

  res.cookie("token", "", { maxAge: 0 });
  res.status(200).json({ message: "User deleted successfully" });
});
