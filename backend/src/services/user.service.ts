import { ErrorCode } from "../common/enums/error-code.enum.js";
import { VerificationEnum } from "../common/enums/verification-code.enum.js";
import User from "../repositories/user.repository.js";
import {
  BadRequestException,
  InternalServerException,
} from "../utils/catch-error.js";
import generateImage from "../utils/generate-image.js";
import VerificationCode from "../repositories/verification-code.repository.js";
import { oneHourFromNow, oneYearFromNow } from "../utils/date.js";
import { compareValue, hashValue } from "../utils/bcrpyt.js";

/**
 * Creates a new user and sends an email verification code.
 *
 * This function:
 * 1. Checks if the user already exists using the provided email.
 * 2. Hashes the user's password.
 * 3. Generates a profile picture.
 * 4. Creates a new user in the database.
 * 5. Generates an email verification code.
 * 6. Returns the created user object.
 *
 * @param fullname - The user's full name.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns The newly created user.
 * @throws {BadRequestException} If the email is already in use.
 */
export const createUser = async (
  fullname: string,
  email: string,
  password: string
) => {
  // Verify Existing User Does Not Exist
  const existingUser = await User.getByEmail(email);
  if (existingUser) {
    throw new BadRequestException(
      "Email already in use",
      ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
    );
  }

  // Create User
  const hashedPassword = await hashValue(password);
  const profilePicture = generateImage();

  const user = await User.create(
    fullname,
    email,
    hashedPassword,
    profilePicture
  );

  // Create Email Verification Code
  const expireDate = oneYearFromNow().toISOString();
  const verificationCode = await VerificationCode.create(
    user.id,
    VerificationEnum.EMAIL_VERIFICATION,
    expireDate
  );

  // Send Verification Email
  console.log(verificationCode.id);

  // Return User & Token
  return user;
};

/**
 * Logs a user in by validating their credentials.
 *
 * This function:
 * 1. Fetches the user by email.
 * 2. Validates the provided password.
 * 3. Returns the user if credentials are valid.
 * 4. Throws an error if the user is not found or credentials are invalid.
 *
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns The logged-in user.
 * @throws {BadRequestException} If the email or password is incorrect.
 */
export const loginUser = async (email: string, password: string) => {
  // Get User By Email
  const user = await User.getByEmail(email);
  if (!user) {
    throw new BadRequestException(
      "Invalid email or password provided",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }
  console.log(user)

  // Validate Password From The Request
  const isPasswordValid = await compareValue(password, user.password);
  if (!isPasswordValid) {
    throw new BadRequestException(
      "Invalid email or password provided",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  // Return User & Token
  return user;
};

/**
 * Updates a user's details.
 *
 * This function:
 * 1. Verifies if the user exists by their ID.
 * 2. Updates the user’s details such as fullname, email, profile picture, or status.
 * 3. Returns the updated user.
 * 4. Throws an error if the user is not found.
 *
 * @param id - The ID of the user to update.
 * @param updates - An object containing the user fields to update.
 * @param updates.fullname - The new full name of the user (optional).
 * @param updates.email - The new email address of the user (optional).
 * @param updates.profilePicture - The new profile picture URL of the user (optional).
 * @param updates.status - The new status of the user (optional).
 * @returns The updated user object.
 * @throws {BadRequestException} If the user is not found.
 */
export const updateUser = async (
  id: string,
  updates: {
    fullname?: string | undefined;
    email?: string | undefined;
    profilePicture?: string | undefined;
    status?: string | undefined;
  }
) => {
  // Verify user exists
  const user = await User.getById(id);
  if (!user) {
    throw new BadRequestException(
      "User not found",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  // Update user's fullname, email, profile_picture or status
  const updatedUser = await User.update(
    id,
    updates.fullname || user.fullname,
    updates.email || user.email,
    user.password,
    updates.profilePicture || user.profilePicture,
    updates.status || user.status,
    user.emailVerified
  );

  return updatedUser;
};

/**
 * Permanently deletes a user from the database.
 *
 * This function:
 * 1. Verifies if the user exists by their ID.
 * 2. Deletes the user from the database.
 * 3. Returns the deleted user object.
 * 4. Throws an error if the user is not found.
 *
 * @param id - The ID of the user to delete.
 * @returns The deleted user object.
 * @throws {BadRequestException} If the user is not found.
 */
export const hardDeleteUser = async (id: string) => {
  const user = await User.getById(id);
  if (!user) {
    throw new BadRequestException(
      "User not found",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  await User.deleteById(id);
  return user;
};

/**
 * Verifies a user's email using a verification code.
 *
 * This function:
 * 1. Retrieves the verification code by its ID and type.
 * 2. Validates the expiry date of the code.
 * 3. Verifies if the user exists.
 * 4. Updates the user to mark the email as verified.
 * 5. Deletes the verification code after successful verification.
 * 6. Returns the updated user.
 *
 * @param code - The verification code.
 * @returns The updated user with verified email.
 * @throws {BadRequestException} If the verification code is invalid or expired.
 * @throws {InternalServerException} If the email verification fails.
 */
export const verifyEmailService = async (code: string) => {
  // Get the Verification Code
  const verificationCode = await VerificationCode.findByIdAndType(
    code,
    VerificationEnum.EMAIL_VERIFICATION
  );
  if (!verificationCode) {
    throw new BadRequestException("Invalid or expired verification token");
  }

  // Verify expiry date
  if (new Date() > new Date(verificationCode.expiresAt)) {
    throw new BadRequestException("Invalid or expired verification token");
  }

  // Verify user exists
  const user = await User.getById(verificationCode.userId);
  if (!user) {
    throw new BadRequestException(
      "User not found",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  // Update the User
  const updatedUser = await User.update(
    verificationCode.userId,
    user.fullname,
    user.email,
    user.password,
    user.profilePicture,
    user.status,
    true
  );
  if (!updatedUser) {
    throw new InternalServerException("Failed to update user");
  }

  // Delete the Verification Code
  await VerificationCode.deleteById(verificationCode.id);

  // Return the User
  return {
    user: updatedUser,
  };
};

/**
 * Sends a password reset email to a user.
 *
 * This function:
 * 1. Retrieves the user by their email.
 * 2. Creates a password reset verification code.
 * 3. Sends the reset email.
 * 4. Returns the email address for the reset request.
 *
 * @param email - The email address of the user requesting a password reset.
 * @returns The email of the user.
 * @throws {BadRequestException} If the user is not found.
 */
export const sendPasswordResetEmail = async (email: string) => {
  // Get the User by Email
  const user = await User.getByEmail(email);
  if (!user) {
    throw new BadRequestException(
      "User not found",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  // ADD RATE LIMITING

  // Create Reset Code
  const expireDate = oneHourFromNow().toISOString();
  const resetCode = await VerificationCode.create(
    user.id,
    VerificationEnum.PASSWORD_RESET,
    expireDate
  );

  // Send Reset Email
  console.log(resetCode.id);

  // Return Success
  return {
    email,
  };
};

/**
 * Resets a user's password using a password reset code.
 *
 * This function:
 * 1. Retrieves the password reset code by its ID and type.
 * 2. Validates the expiry date of the reset code.
 * 3. Updates the user's password to the new one.
 * 4. Deletes the reset code after successful password change.
 * 5. Returns the updated user.
 *
 * @param password - The new password for the user.
 * @param code - The password reset code.
 * @returns The updated user after password reset.
 * @throws {BadRequestException} If the reset code is invalid or expired.
 * @throws {InternalServerException} If the password reset fails.
 */
export const resetPassword = async (password: string, code: string) => {
  // Get the Reset Code
  const resetCode = await VerificationCode.findByIdAndType(
    code,
    VerificationEnum.PASSWORD_RESET
  );
  if (!resetCode) {
    throw new BadRequestException("Invalid or expired verification token");
  }

  // Verify expiry date
  if (new Date() > new Date(resetCode.expiresAt)) {
    throw new BadRequestException("Invalid or expired verification token");
  }

  // Verify user exists
  const user = await User.getById(resetCode.userId);
  if (!user) {
    throw new BadRequestException(
      "User not found",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  // Update the User
  const hashedPassword = await hashValue(password);
  const updatedUser = await User.update(
    resetCode.userId,
    user.fullname,
    user.email,
    hashedPassword,
    user.profilePicture,
    user.status,
    user.emailVerified
  );
  if (!updatedUser) {
    throw new InternalServerException("Failed to reset password");
  }

  // Delete the Verification Code
  await VerificationCode.deleteById(resetCode.id);

  return {
    user: updatedUser,
  };
};
