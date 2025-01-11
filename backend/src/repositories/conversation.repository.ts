import { query } from "../config/db.js";
import { toCamelCase } from "./utils/toCamelCase.js";

const createConversation = async (
  conversationType: string,
  name: string | null = null
) => {
  const { rows } = await query(
    "INSERT INTO conversations (type, name) VALUES ($1, $2) RETURNING *;",
    [conversationType, name]
  );
  return toCamelCase(rows)[0];
};

const addParticipant = async (conversationId: string, userId: string) => {
  const { rows } = await query(
    "INSERT INTO conversation_participants (conversation_id, user_id) VALUES ($1, $2)",
    [conversationId, userId]
  );
  return toCamelCase(rows)[0];
};

const removeParticipant = async (conversationId: string, userId: string) => {
  const { rows } = await query(
    "DELETE FROM conversation_participants WHERE conversation_id = $1 AND user_id = $2",
    [conversationId, userId]
  );
  return toCamelCase(rows)[0];
};

const getConversationById = async (conversationId: string) => {
  const { rows } = await query(
    "SELECT * FROM conversations WHERE conversation_id = $1",
    [conversationId]
  );
  return toCamelCase(rows)[0];
};

const getUserConversations = async (userId: string) => {
  const { rows } = await query(
    "SELECT c.id, c.type, c.name FROM conversations c JOIN conversation_participants cp ON c.id = cp.conversation_id WHERE cp.user_id = $1",
    [userId]
  );
  return toCamelCase(rows);
};

const deleteConversation = async (conversationId: string) => {
  const { rows } = await query("DELETE FROM conversations WHERE id = $1", [
    conversationId,
  ]);
  return toCamelCase(rows)[0];
};

export default {
  createConversation,
  addParticipant,
  removeParticipant,
  getConversationById,
  getUserConversations,
  deleteConversation,
};
