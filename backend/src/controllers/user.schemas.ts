import { z } from "zod";

const userSchema = z
  .object({
    fullname: z.string().trim().max(255).optional(),
    email: z.string().trim().email().max(255).optional(),
    profilePicture: z.string().trim().max(255).optional(),
    status: z.string().trim().max(255).optional()
  })

export {
  userSchema
};
