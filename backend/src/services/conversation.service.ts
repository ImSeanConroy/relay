import Conversation from "../repositories/conversation.repository.js";
import Participants from "../repositories/participants.repository.js";
import { BadRequestException } from "../utils/catch-error.js";
import { ErrorCode } from "../common/enums/error-code.enum.js";

/**
 * Create a new conversation.
 *
 * This function:
 * 1. Verifies if the conversation exists by their ID.
 * 2. Updates the conversation details such as fullname, email, profile picture, or status.
 * 3. Returns the updated conversation.
 * 4. Throws an error if the conversation is not found.
 *
 * @param id - The ID of the conversation to update.
 * @param updates - An object containing the conversation fields to update.
 * @param updates.name - The new full name of the conversation (optional).
 * @param updates.name - The new full name of the conversation (optional).
 * @returns The updated conversation object.
 * @throws {BadRequestException} If the conversation is not found.
 */
export const createConversation = async ({
  name,
  type,
  requesterId,
}: {
  name: string | null;
  type: string;
  requesterId: string;
}) => {
  const newConversation = await Conversation.create(name, type);

  await Participants.add(newConversation.id, requesterId);

  return newConversation;
};

/**
 * Updates a conversation's details.
 *
 * This function:
 * 1. Verifies if the conversation exists by their ID.
 * 2. Updates the conversation details such as fullname, email, profile picture, or status.
 * 3. Returns the updated conversation.
 * 4. Throws an error if the conversation is not found.
 *
 * @param id - The ID of the conversation to update.
 * @param updates - An object containing the conversation fields to update.
 * @param updates.name - The new full name of the conversation (optional).
 * @returns The updated conversation object.
 * @throws {BadRequestException} If the conversation is not found.
 */
export const updateConversation = async (
  id: string,
  updates: {
    name?: string | undefined;
  }
) => {
  // Verify conversation exists
  const conversation = await Conversation.getById(id);
  if (!conversation) {
    throw new BadRequestException(
      "Conversation not found",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  // Update conversation's fullname, email, profile_picture or status
  const updatedConversation = await Conversation.update(
    id,
    updates.name || conversation.name
  );

  return updatedConversation
};

/**
 * Permanently deletes a conversation from the database.
 *
 * This function:
 * 1. Verifies if the conversation exists by their ID.
 * 2. Deletes the conversation from the database.
 * 3. Returns the deleted conversation object.
 * 4. Throws an error if the conversation is not found.
 *
 * @param id - The ID of the conversation to delete.
 * @returns The deleted conversation object.
 * @throws {BadRequestException} If the conversation is not found.
 */
export const deleteConversation = async (id: string) => {
  const conversation = await Conversation.getById(id);
  if (!conversation) {
    throw new BadRequestException(
      "Conversation not found",
      ErrorCode.AUTH_USER_NOT_FOUND
    );
  }

  await Conversation.deleteById(id);
  return conversation
};
