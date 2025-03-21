import { z } from "zod";

// Schema for validating create conversation data object
export const createConversationSchema = z.object({
  type: z.enum(["direct", "group"]),
  name: z.string().min(1, "Group name cannot be empty").max(100).optional(),
});


// Schema for validating update conversation data object
export const updateConversationSchema = z.object({
  name: z.string().min(1, "Group name cannot be empty").max(100).optional(),
});
