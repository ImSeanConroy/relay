import { ErrorCode } from "../common/error-code.enum.js";
import {
  CreateUserParams,
  LoginUserParams,
} from "../common/interface/auth.interface.js";
import User from "../repositories/user.repository.js";
import { BadRequestException } from "../utils/catch-error.js";
import generateImage from "../utils/generate-image.js";
import bcryptjs from "bcryptjs";

/**
 * Create a new user.
 */
export const createUser = async ({
  fullname,
  email,
  password,
}: CreateUserParams) => {
  // Verify Existing User Does Not Exist
  const existingUser = await User.getUserByEmail(email);
  if (existingUser) {
    throw new BadRequestException(
      "Email already in use",
      ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
    );
  }

  // Create User
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  const profilePicture = generateImage();

  const user = await User.createUser(
    fullname,
    email,
    hashedPassword,
    profilePicture
  );

  // Return User & Token
  return user;
};

/**
 * Login a user.
 */
export const loginUser = async ({ email, password }: LoginUserParams) => {
  // Get User By Email
  const user = await User.getUserByEmail(email);
  if (!user) {
    throw new BadRequestException(
      "Invalid email or password provided",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  // Validate Password From The Request
  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    throw new BadRequestException(
      "Invalid email or password provided",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  // Return User & Token
  return {
    user,
  };
};

// /**
//  * Update a user.
//  */
export const updateUser = async ({
  id,
  fullname,
  email,
  profilePicture,
  status,
}: {
  id: string;
  fullname?: string | undefined;
  email?: string | undefined;
  profilePicture?: string | undefined;
  status?: string | undefined;
}) => {
  // Verify user exists
  const user = await User.getUserById(id);
  if (!user) {
    throw new BadRequestException(
      "User not found",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  const newUser = await User.updateUser(
    id,
    fullname || user.fullname,
    email || user.email,
    profilePicture || user.profilePicture,
    status || user.status
  );

  return newUser;
};

// /**
//  * Hard delete a user by ID.
//  */
export const hardDeleteUser = async (id: string) => {
  const user = await User.getUserById(id);
  if (!user) {
    throw new BadRequestException(
      "User not found",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  await User.deleteUser(id);

  return user;
};
