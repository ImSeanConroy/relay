import { z } from "zod";

// Schema for validating email
export const emailSchema = z.string().trim().email().min(1).max(255);

// Schema for validating password
export const passwordSchema = z.string().trim().min(6).max(255);

// Schema for validating a verification code
export const verificationCodeSchema = z.string().trim().min(1);

// Schema for validating login form
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Schema for validating user signup form
// Also ensures that the password matches the confirmPassword field
export const signupSchema = z
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

// Schema for validating the password reset form
export const resetPasswordSchema = z.object({
  password: passwordSchema,
  verificationCode: verificationCodeSchema,
});