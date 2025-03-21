import { VerificationEnum } from "../common/enums/verification-code.enum.js";
import { VerificationCode } from "../common/interface/verification-code.interface.js";
import { query } from "../config/db.js";
import { toCamelCase } from "./utils/to-camel-case.js";

/**
 * Retrieves a verification code by its ID.
 *
 * @param id - The unique identifier of the verification code.
 * @returns The verification code object if found, otherwise null.
 */
const findById = async (id: string): Promise<VerificationCode | null> => {
  const { rows } = await query(
    "SELECT * FROM verification_codes WHERE id = $1;",
    [id]
  );
  return toCamelCase(rows)[0] || null;
};

/**
 * Retrieves a verification code by its ID and type.
 *
 * @param id - The unique identifier of the verification code.
 * @param type - The type of verification (e.g., EMAIL_VERIFICATION, PASSWORD_RESET).
 * @returns The verification code object if found, otherwise null.
 */
const findByIdAndType = async (
  id: string,
  type: VerificationEnum
): Promise<VerificationCode | null> => {
  const { rows } = await query(
    "SELECT * FROM verification_codes WHERE id = $1 AND type = $2",
    [id, type]
  );
  return toCamelCase(rows)[0] || null;
};

/**
 * Creates a new verification code for a user.
 *
 * @param userId - The unique identifier of the user.
 * @param type - The type of verification code (e.g., email verification).
 * @param expiresAt - The expiration date of the verification code.
 * @returns The newly created verification code object.
 */
const create = async (
  userId: string,
  type: VerificationEnum,
  expiresAt: string
): Promise<VerificationCode> => {
  const { rows } = await query(
    "INSERT INTO verification_codes (user_id, type, expires_at) VALUES ($1, $2, $3) RETURNING *;",
    [userId, type, expiresAt]
  );
  return toCamelCase(rows)[0];
};

/**
 * Deletes a verification code by its ID.
 *
 * @param id - The unique identifier of the verification code to delete.
 * @returns Resolves when the verification code is deleted.
 */
const deleteById = async (id: string): Promise<void> => {
  await query("DELETE FROM verification_codes WHERE id = $1", [id]);
};

export default { findById, findByIdAndType, create, deleteById };
