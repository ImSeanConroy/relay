import Participants from "../repositories/participants.repository.js";
import Conversation from "../repositories/conversation.repository.js";
import User from "../repositories/user.repository.js";
import { BadRequestException } from "../utils/catch-error.js";
import { ErrorCode } from "../common/enums/error-code.enum.js";

/**
 * Add users to a conversation.
 *
 * This function:
 * 1. Verifies if the conversation exists by their ID.
 * 2. Verifies if the users exist by their IDs.
 * 3. Maps of the users and creates the participants in the database.
 * 4. Throws an error if the conversation or users are not found.

 * @param conversationId - The ID of the conversation.
 * @param userIds - The ID's of the users.
 * @throws {BadRequestException} If the conversation is not found.
 */
export const addUsers = async (conversationId: string, userIds: string[]) => {
  // Verify conversation exists
  const conversation = await Conversation.getById(conversationId);
  if (!conversation) {
    throw new BadRequestException(
      "Conversation not found",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  // Verify users exists
  var invalidUsers: string[] = []
  userIds.map(async (id) => {
    const user = User.getById(id)
    if (!user) {
      invalidUsers.push(id)
    }
  });
  if (invalidUsers.length > 0) {
    throw new BadRequestException(
      `Users not found: ${invalidUsers.join(", ")}`,
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  // Add users to conversation
  userIds.map(async (id) => {
    await Participants.add(conversationId, id);
  });
};

/**
 * Removes users from a conversation.
 *
 * This function:
 * 1. Verifies if the conversation exists by their ID.
 * 2. Verifies if the users exist by their IDs.
 * 3. Maps of the users and deletes the participants in the database.
 * 4. Throws an error if the conversation or users are not found.

 * @param conversationId - The ID of the conversation.
 * @param userIds - The ID's of the users.
 * @throws {BadRequestException} If the conversation is not found.
 */
export const removeUsers = async (conversationId: string, userIds: string[]) => {
  // Verify conversation exists
  const conversation = await Conversation.getById(conversationId);
  if (!conversation) {
    throw new BadRequestException(
      "Conversation not found",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  // Verify users exists
  var invalidUsers: string[] = []
  userIds.map(async (id) => {
    const user = User.getById(id)
    if (!user) {
      invalidUsers.push(id)
    }
  });
  if (invalidUsers.length > 0) {
    throw new BadRequestException(
      `Users not found: ${invalidUsers.join(", ")}`,
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  // Remove users from conversation
  userIds.map(async (id) => {
    await Participants.remove(conversationId, id);
  });
};
