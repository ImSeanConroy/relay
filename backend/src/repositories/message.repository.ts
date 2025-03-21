// import { query } from "../config/db.js";
// import { toCamelCase } from "./utils/to-camel-case.js";

// const getMessageById = async (id: string) => {
//   const { rows } = await query("SELECT * FROM message WHERE id = $1;", [id]);
//   return toCamelCase(rows)[0];
// };

// const createMessage = async (
//   conversationId: string,
//   userId: string,
//   body: string
// ) => {
//   const { rows } = await query(
//     "INSERT INTO messages (conversation_id, user_id, body) VALUES ($1, $2, $3) RETURNING id, body, sent_at;",
//     [conversationId, userId, body]
//   );
//   return toCamelCase(rows)[0];
// };

// const updateMessage = async (
//   messageId: string,
//   body: string
// ) => {
//   const { rows } = await query(
//     "UPDATE messages SET body = $1 WHERE id = $2 RETURNING id, body, sent_at",
//     [body, messageId]
//   );
//   return toCamelCase(rows)[0];
// };

// const deleteMessage = async (
//   messageId: string,
// ) => {
//   const { rows } = await query(
//     "UPDATE messages SET is_deleted = true WHERE id = $1 RETURNING id",
//     [messageId]
//   );
//   return toCamelCase(rows)[0];
// };

// const getMessagesForConversation = async (conversationId: string) => {
//   const { rows } = await query(
//     "SELECT m.id, m.body, m.sent_at, u.fullname FROM messages AS m JOIN users AS u ON m.user_id = u.id WHERE m.conversation_id = $1 ORDER BY m.sent_at",
//     [conversationId]
//   );
//   return toCamelCase(rows)[0];
// };

// export default { getMessageById, createMessage, updateMessage, deleteMessage, getMessagesForConversation };
