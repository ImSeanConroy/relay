import Conversation from "../repositories/conversation.repository.js";
import { InternalServerException } from "../utils/catch-error.js";

/**
 * Fetch a conversation by ID.
 */
const findById = async (conversationId: string) => {
  try {
    const conversation = await Conversation.getConversationById(conversationId);
    if (!conversation) {
      throw new InternalServerException(`Conversation with ID: ${conversationId} not found`);
    }
    return conversation;
  } catch (error) {
    const err = error as Error;
    throw new InternalServerException(
      `Error fetching conversation with ID: ${conversationId} - ${err.message}`
    );
  }
};

/**
 * Fetch all participants of a conversation.
 */
const findUsers = async (conversationId: string) => {
  try {
    const participants = await Conversation.getConversationParticipants(
      conversationId
    );
    return participants;
  } catch (error) {
    const err = error as Error;
    throw new InternalServerException(
      `Error fetching participants for conversation ID: ${conversationId} - ${err.message}`
    );
  }
};

/**
 * Fetch all conversations a user is part of.
 */
const findByUser = async (userId: string) => {
  try {
    const conversations = await Conversation.getUserConversations(userId);
    return conversations;
  } catch (error) {
    const err = error as Error;
    throw new InternalServerException(
      `Error fetching conversations for user ID: ${userId} - ${err.message}`
    );
  }
};

/**
 * Create a new conversation.
 */
const create = async (
  conversationType: string,
  name: string | null = null,
  requesterId: string
) => {
  try {
    const newConversation = await Conversation.createConversation(
      conversationType,
      name
    );

    await Conversation.addParticipant(newConversation.id, requesterId);

    return newConversation;
  } catch (error) {
    const err = error as Error;
    throw new InternalServerException(
      `Error creating conversation of type: ${conversationType} - ${err.message}`
    );
  }
};

/**
 * Add a user to a conversation.
 */
const addUser = async (
  conversationId: string,
  userId: string,
  requesterId: string
) => {
  try {
    // Validate the requester is part of the conversation
    await isUserInConversation(conversationId, requesterId);

    // Check if the user to be added is already a participant
    const conversation = await findById(conversationId);
    if (conversation.participants.includes(userId)) {
      throw new InternalServerException(
        `User ID: ${userId} is already a participant in conversation ID: ${conversationId}`
      );
    }

    // Add the user to the conversation
    const updatedConversation = await Conversation.addParticipant(
      conversationId,
      userId
    );
    return updatedConversation;
  } catch (error) {
    const err = error as Error;
    throw new InternalServerException(
      `Error adding user ID: ${userId} to conversation ID: ${conversationId} by requester ID: ${requesterId} - ${err.message}`
    );
  }
};

/**
 * Remove a user from a conversation.
 */
const removeUser = async (
  conversationId: string,
  userId: string,
  requesterId: string
) => {
  try {
    // Validate the requester is part of the conversation
    await isUserInConversation(conversationId, requesterId);

    // Check if the user to be removed is actually a participant
    const conversation = await findById(conversationId);
    if (!conversation.participants.includes(userId)) {
      throw new InternalServerException(
        `User ID: ${userId} is not a participant in conversation ID: ${conversationId}`
      );
    }

    // Optional: Check if the requester has sufficient privileges (e.g., admin check)
    // if (conversation.admin && conversation.admin !== requesterId) {
    //   throw new InternalServerException(`Requester ID: ${requesterId} does not have sufficient privileges to remove participants`);
    // }

    // Remove the user from the conversation
    const updatedConversation = await Conversation.removeParticipant(
      conversationId,
      userId
    );
    return updatedConversation;
  } catch (error) {
    const err = error as Error;
    throw new InternalServerException(
      `Error removing user ID: ${userId} from con
    const err = error as Error;versation ID: ${conversationId} by requester ID: ${requesterId} - ${err.message}`
    );
  }
};

/**
 * Hard delete a conversation by ID.
 */
const hardDelete = async (id: string) => {
  try {
    const deletedConversation = await Conversation.deleteConversation(id);
    return deletedConversation;
  } catch (error) {
    const err = error as Error;
    throw new InternalServerException(
      `Error deleting conversation with ID: ${id} - ${err.message}`
    );
  }
};

/**
 * Check if a user is part of a conversation.
 */
const isUserInConversation = async (conversationId: string, userId: string) => {
  try {
    const conversation = await findById(conversationId);
    const isParticipant = conversation.participants.includes(userId);
    if (!isParticipant) {
      throw new InternalServerException(
        `User ID: ${userId} is not a participant in conversation ID: ${conversationId}`
      );
    }
    return isParticipant;
  } catch (error) {
    const err = error as Error;
    throw new InternalServerException(
      `Error checking if user ID: ${userId} is in conversation ID: ${conversationId} - ${err.message}`
    );
  }
};

export default {
  findById,
  findUsers,
  findByUser,
  create,
  addUser,
  removeUser,
  hardDelete,
  isUserInConversation,
};
