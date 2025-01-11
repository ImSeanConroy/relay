import Message from "../repositories/message.repository.js";

const findById = async (id: string) => {
  try {
    const user = await Message.getMessageById(id);
    return user;
  } catch (error) {
    throw new Error("Error fetching user by id");
  }
};

const create = async (conversationId: string, userId: string, body: string) => {
  try {
    const message = await Message.createMessage(conversationId, userId, body);
    return message;
  } catch (error) {
    throw new Error("Error creating message");
  }
};

const udpate = async (messageId: string, body: string) => {
  try {
    const message = await Message.updateMessage(messageId, body);
    return message;
  } catch (error) {
    throw new Error("Error creating message");
  }
};

const softDelete = async (messageId: string) => {
  try {
    const message = await Message.deleteMessage(messageId);
    return message;
  } catch (error) {
    throw new Error("Error creating message");
  }
};

const findByConversationId = async (conversationId: string) => {
  try {
    const message = await Message.getMessagesForConversation(conversationId);
    return message;
  } catch (error) {
    throw new Error("Error finding messages for conversation id");
  }
};

export default { findById, create, udpate, softDelete, findByConversationId }
