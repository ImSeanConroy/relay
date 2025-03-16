import { z } from "zod";

const emailSchema = z.string().trim().email().min(1).max(255);
const passwordSchema = z.string().trim().min(6).max(255);

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const signupSchema = z
  .object({
    fullname: z.string().trim().min(1).max(255),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export {
  loginSchema,
  signupSchema,
  emailSchema,
  passwordSchema,
};
