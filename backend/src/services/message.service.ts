import Message from "../repositories/message.repository.js";
import Conversation from "../services/conversation.service.js";
import { InternalServerException } from "../utils/catch-error.js";

/**
 * Validates if a user is part of a conversation.
 * Throws an error if the user is not a participant.
 */
const validateUserInConversation = async (
  conversationId: string,
  userId: string
) => {
  const isParticipant = await Conversation.isUserInConversation(
    conversationId,
    userId
  );
  if (!isParticipant) {
    throw new InternalServerException(
      `User with ID: ${userId} is not a participant in conversation ID: ${conversationId}`
    );
  }
};

/**
 * Validates if a user owns the message.
 * Throws an error if the user is not the owner.
 */
const validateMessageOwnership = async (messageId: string, userId: string) => {
  const message = await Message.getMessageById(messageId);
  if (!message) {
    throw new Error(`Message with ID: ${messageId} not found`);
  }
  if (message.userId !== userId) {
    throw new InternalServerException(
      `User with ID: ${userId} is not the owner of message ID: ${messageId}`
    );
  }
  return message;
};

/**
 * Fetch a message by ID.
 */
const findById = async (messageId: string) => {
  try {
    const message = await Message.getMessageById(messageId);
    if (!message) {
      throw new InternalServerException(`Message with ID: ${messageId} not found`);
    }
    return message;
  } catch (error) {
    throw new InternalServerException(`Error fetching message with ID: ${messageId}`);
  }
};

/**
 * Create a new message.
 */
const create = async (conversationId: string, userId: string, body: string) => {
  try {
    // Validate that the user is part of the conversation
    await validateUserInConversation(conversationId, userId);

    const newMessage = await Message.createMessage(
      conversationId,
      userId,
      body
    );
    return newMessage;
  } catch (error) {
    const err = error as Error;
    throw new InternalServerException(
      `Error creating message in conversation ID: ${conversationId} by user ID: ${userId} - ${err.message}`
    );
  }
};

/**
 * Update a message.
 */
const update = async (messageId: string, body: string, userId: string) => {
  try {
    // Validate that the user owns the message
    const message = await validateMessageOwnership(messageId, userId);

    // Proceed to update the message
    const updatedMessage = await Message.updateMessage(message.id, body);
    return updatedMessage;
  } catch (error) {
    const err = error as Error;
    throw new InternalServerException(
      `Error updating message with ID: ${messageId} - ${err.message}`
    );
  }
};

/**
 * Soft delete a message by ID.
 */
const softDelete = async (messageId: string, userId: string) => {
  try {
    // Validate that the user owns the message
    const message = await validateMessageOwnership(messageId, userId);

    // Proceed to delete the message
    const deletedMessage = await Message.deleteMessage(message.id);
    return deletedMessage;
  } catch (error) {
    const err = error as Error;
    throw new InternalServerException(
      `Error soft-deleting message with ID: ${messageId} - ${err.message}`
    );
  }
};

/**
 * Fetch all messages for conversation by ID.
 */
const findByConversationId = async (conversationId: string, userId: string) => {
  try {
    // Validate that the user is part of the conversation
    await validateUserInConversation(conversationId, userId);

    const messages = await Message.getMessagesForConversation(conversationId);
    return messages;
  } catch (error) {
    const err = error as Error;
    throw new InternalServerException(
      `Error retrieving messages for conversation ID: ${conversationId} - ${err.message}`
    );
  }
};

export default {
  findById,
  create,
  update,
  softDelete,
  findByConversationId,
};
