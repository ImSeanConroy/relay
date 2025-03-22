import { query } from "../config/db.js";
import { toCamelCase } from "./utils/to-camel-case.js";

/**
 * Creates a new participant in the database.
 *
 * This function executes a SQL query to create a new participant mapping a user and
 * a conversation
 *
 * @param conversationId - The unique identifier of the converation.
 * @param userIds - The unique identifiers of the users.
 */
const add = async (conversationId: string, userId: string) => {
  const { rows } = await query(
    "INSERT INTO conversation_participants (conversation_id, user_id) VALUES ($1, $2)",
    [conversationId, userId]
  );
  return toCamelCase(rows)[0];
};

/**
 * Remove a participant from the database.
 *
 * This function executes a SQL query to delete a participant mapping a user and
 * a conversation
 *
 * @param conversationId - The unique identifier of the converation.
 * @param userIds - The unique identifiers of the users.
 */
const remove = async (conversationId: string, userId: string) => {
  const { rows } = await query(
    "DELETE FROM conversation_participants WHERE conversation_id = $1 AND user_id = $2",
    [conversationId, userId]
  );
  return toCamelCase(rows)[0];
};

export default { add, remove }