import { User } from "../common/interface/user.interface.js";
import { query } from "../config/db.js";
import { toCamelCase } from "./utils/to-camel-case.js";

/**
 * Retrieves all users from the database.
 *
 * This function executes a SQL query to fetch all user records and 
 * converts the result to camelCase format.
 *
 * @returns A list of users.
 */
const getAll = async (): Promise<User[]> => {
  const { rows } = await query("SELECT * FROM users;");
  return toCamelCase(rows);
};

/**
 * Retrieves a user by their unique ID.
 *
 * @param id - The unique identifier of the user.
 * @returns The user object if found, otherwise null.
 */
const getById = async (id: string): Promise<User | null> => {
  const { rows } = await query(`SELECT * FROM users WHERE id = $1 LIMIT 1;`, [
    id,
  ]);
  return toCamelCase(rows)[0] || null;
};

/**
 * Retrieves a user by their email address.
 *
 * @param email - The email address of the user.
 * @returns The user object if found, otherwise null.
 */
const getByEmail = async (email: string): Promise<User | null> => {
  const { rows } = await query(
    `SELECT * FROM users WHERE email = $1 LIMIT 1 RETURNING *;;`,
    [email]
  );
  return toCamelCase(rows)[0] || null;
};

/**
 * Creates a new user in the database.
 *
 * @param fullname - The full name of the user.
 * @param email - The email address of the user.
 * @param password - The hashed password of the user.
 * @param profilePicture - The URL of the user's profile picture.
 * @returns The newly created user object.
 */
const create = async (
  fullname: string,
  email: string,
  password: string,
  profilePicture: string
): Promise<User> => {
  const { rows } = await query(
    `INSERT INTO users (fullname, email, password, profile_picture)
     VALUES ($1, $2, $3, $4) RETURNING *;`,
    [fullname, email, password, profilePicture]
  );
  return toCamelCase(rows)[0];
};

/**
 * Updates an existing user in the database.
 *
 * @param id - The unique identifier of the user.
 * @param fullname - The full name of the user.
 * @param email - The email address of the user.
 * @param password - The hashed password of the user.
 * @param profilePicture - The URL of the user's profile picture.
 * @param status - The status of the user account.
 * @param emailVerified - Indicates whether the email is verified.
 * @returns The updated user object, or null if not found.
 */
const update = async (
  id: string,
  fullname: string,
  email: string,
  password: string,
  profilePicture: string,
  status: string,
  emailVerified: boolean
): Promise<User | null> => {
  const { rows } = await query(
    `UPDATE users 
     SET fullname = $1, email = $2, password = $3, profile_picture = $4, status = $5, email_verified = $6 
     WHERE id = $7 RETURNING *;`,
    [fullname, email, password, profilePicture, status, emailVerified, id]
  );
  return toCamelCase(rows)[0] || null;
};

/**
 * Deletes a user from the database by their ID.
 *
 * @param id - The unique identifier of the user to delete.
 * @returns Resolves when the user is deleted.
 */
const deleteById = async (id: string): Promise<void> => {
  await query("DELETE FROM users WHERE id = $1", [id]);
};

export default {
  getAll,
  getById,
  getByEmail,
  create,
  update,
  deleteById,
};
