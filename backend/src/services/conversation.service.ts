import Conversation from "../repositories/conversation.repository.js";

const findById = async (id: string) => {
  try {
    const conversation = await Conversation.getConversationById(id);
    return conversation;
  } catch (error) {
    throw new Error("Error fetching conversation by id");
  }
};

const findUsers = async (conversationId: string) => {
  try {
    const conversation = await Conversation.getConversationParticipants(conversationId);
    return conversation;
  } catch (error) {
    throw new Error("Error fetching conversation by id");
  }
};

const findByUser = async (id: string) => {
  try {
    const conversation = await Conversation.getUserConversations(id);
    return conversation;
  } catch (error) {
    throw new Error("Error fetching conversation by user");
  }
};

const create = async (conversationType: string, name: string | null = null) => {
  try {
    const conversations = await Conversation.createConversation(
      conversationType,
      name
    );
    return conversations;
  } catch (error) {
    throw new Error("Error creating all conversations");
  }
};

const addUser = async (conversationId: string, userId: string) => {
  try {
    const conversation = await Conversation.addParticipant(
      conversationId,
      userId
    );
    return conversation;
  } catch (error) {
    throw new Error("Error adding user to conversation");
  }
};

const removeUser = async (conversationId: string, userId: string) => {
  try {
    const conversation = await Conversation.removeParticipant(
      conversationId,
      userId
    );
    return conversation;
  } catch (error) {
    throw new Error("Error adding user to conversation");
  }
};

const hardDelete = async (id: string) => {
  try {
    const conversation = await Conversation.deleteConversation(id);
    return conversation;
  } catch (error) {
    throw new Error("Error fetching conversation by user");
  }
};

export default { findById, findUsers, findByUser, create, addUser, removeUser, hardDelete };
