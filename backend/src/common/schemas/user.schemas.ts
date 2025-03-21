import { z } from "zod";
import { emailSchema } from "./auth.schemas.js";

// Schema for validating user data object
export const userSchema = z.object({
  fullname: z.string().trim().max(255).optional(),
  email: emailSchema.optional(),
  profilePicture: z.string().trim().max(255).optional(),
  status: z.string().trim().max(255).optional(),
});