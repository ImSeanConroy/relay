import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../repositories/user.repository.js";
import { config } from "../constants/app.config.js";
import {
  InternalServerException,
  NotFoundException,
  UnauthorizedException,
} from "../utils/catch-error.js";
import { ErrorCode } from "../common/enums/error-code.enum.js";
import { asyncHandler } from "./async-handler.js";

interface DecodedToken extends JwtPayload {
  userId: string;
}

// Extend the Request interface to include the user object, which will be added after authentication
declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
        email?: string;
        fullname?: string;
        profilePicture?: string;
      };
    }
  }
}

/**
 * Middleware to protect routes by verifying JWT tokens.
 * It checks for a valid token in the cookies, decodes it, validates the user,
 * and adds the user to the request object if everything is valid.
 *
 * @param req - The Express request object
 * @param res - The Express response object
 * @param next - The next middleware function
 */
const protectRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
      throw new UnauthorizedException(
        "Invalid token",
        ErrorCode.AUTH_INVALID_TOKEN
      );
    }

    const decoded = jwt.verify(token, config.JWT.SECRET) as DecodedToken;
    if (!decoded) {
      throw new UnauthorizedException(
        "Invalid token",
        ErrorCode.AUTH_INVALID_TOKEN
      );
    }

    const user = await User.getById(decoded.userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    req.user = user;
    next();
  }
);

export default protectRoute;
