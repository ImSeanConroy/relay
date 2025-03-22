import { z } from "zod";

// Schema for validating participants data object
export const participantsSchema = z.object({
  conversationId: z.string().trim(),
  userIds: z.array(z.string().trim())
});
