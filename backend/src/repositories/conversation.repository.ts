import { Conversation } from "../common/interface/conversation.interface.js";
import { query } from "../config/db.js";
import { toCamelCase } from "./utils/to-camel-case.js";

/**
 * Retrieves all converations from the database.
 *
 * This function executes a SQL query to fetch all conversations belonging to a user and
 * converts the result to camelCase format.
 *
 * @param userId - The unique identifier of the user.
 * @returns A list of conversations.
 */
const getByUserId = async (userId: string) => {
  const { rows } = await query(
    "SELECT c.id, c.type, c.name, c.updated_at, c.created_at FROM conversations c JOIN conversation_participants cp ON c.id = cp.conversation_id WHERE cp.user_id = $1",
    [userId]
  );
  return toCamelCase(rows) || null;
};

/**
 * Retrieves a converation by its unique ID.
 *
 * @param id - The unique identifier of the converation.
 * @returns The converation object if found, otherwise null.
 */
const getById = async (id: string): Promise<Conversation | null> => {
  const { rows } = await query(`SELECT * FROM conversations WHERE id = $1 LIMIT 1;`, [
    id,
  ]);
  return toCamelCase(rows)[0] || null;
};

/**
 * Retrieves new converation in the database.
 *
 * @param name - The name of the converation.
 * @param email - The type of the converation.
 * @returns A list of conversations.
 */
const create = async (
  name: string | null = null,
  type: string
) => {
  const { rows } = await query(
    "INSERT INTO conversations (type, name) VALUES ($1, $2) RETURNING *;",
    [type, name]
  );
  return toCamelCase(rows)[0];
};

/**
 * Updates an existing conversation in the database.
 *
 * @param id - The unique identifier of the conversation.
 * @param name - The name of the conversation.
 * @returns The updated conversation object, or null if not found.
 */
const update = async (
  id: string,
  name: string
): Promise<Conversation | null> => {
  const { rows } = await query(
    `UPDATE conversations 
     SET name = $1 WHERE id = $2 RETURNING *;`,
    [name, id]
  );
  return toCamelCase(rows)[0] || null;
};

/**
 * Deletes a conversation from the database by its ID.
 *
 * @param id - The unique identifier of the conversation to delete.
 * @returns Resolves when the conversation is deleted.
 */
const deleteById = async (id: string): Promise<void> => {
  await query("DELETE FROM conversations WHERE id = $1", [id]);
};

export default {
  getByUserId,
  getById,
  create,
  update,
  deleteById
};
