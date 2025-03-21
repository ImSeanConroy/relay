import { query } from "../config/db.js";
import { toCamelCase } from "./utils/to-camel-case.js";

/**
 * Retrieves all user converations from the database.
 *
 * This function executes a SQL query to fetch all conversations belonging to a user and
 * converts the result to camelCase format.
 *
 * @param conversationId - The unique identifier of the converation.
 * @param userId - The unique identifier of the user.
 * @returns A list of conversations.
 */
const add = async (conversationId: string, userId: string) => {
  const { rows } = await query(
    "INSERT INTO conversation_participants (conversation_id, user_id) VALUES ($1, $2)",
    [conversationId, userId]
  );
  return toCamelCase(rows)[0];
};

/**
 * Retrieves all user converations from the database.
 *
 * This function executes a SQL query to fetch all conversations belonging to a user and
 * converts the result to camelCase format.
 *
 * @param userId - The unique identifier of the user.
 * @returns A list of conversations.
 */
const remove = async (conversationId: string, userId: string) => {
  const { rows } = await query(
    "DELETE FROM conversation_participants WHERE conversation_id = $1 AND user_id = $2",
    [conversationId, userId]
  );
  return toCamelCase(rows)[0];
};

export default { add, remove }