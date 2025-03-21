import { VerificationEnum } from "../enums/verification-code.enum.js";

export interface VerificationCode {
  id: string;
  userId: string;
  type: VerificationEnum;
  expiresAt: string;
  createdAt: string;
}
