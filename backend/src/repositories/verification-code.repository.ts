import { VerificationEnum } from "../common/enums/verification-code.enum.js";
import { query } from "../config/db.js";
import { toCamelCase } from "./utils/to-camel-case.js";

// Function to find a verification code by its ID
const findById = async (id: string) => {
  const { rows } = await query("SELECT * FROM verification_codes WHERE id = $1;", [id]);
  return toCamelCase(rows)[0];
};

const findOne = async (id: string, type: VerificationEnum) => {
  const { rows } = await query('SELECT * FROM users WHERE id = $1 AND type = $2', [id, type]);
  return toCamelCase(rows)[0];
};

// Function to create a new verification code
const create = async (
  userId: string,
  type: VerificationEnum,
  expiresAt: string
) => {
  const { rows } = await query(
    "INSERT INTO verification_codes (user_id, type, expires_at) VALUES ($1, $2, $3) RETURNING *;",
    [userId, type, expiresAt]
  );
  return toCamelCase(rows)[0];
};

// Function to delete a verification code by its ID
const deleteById = async (id: string) => {
  return await query(
    "DELETE FROM verification_codes WHERE id = $1",
    [id]
  );
};

export default { findById, findOne, create, deleteById };
