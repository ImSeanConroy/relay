import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../repositories/user.repository.js";
import { config } from "../constants/app.config.js";

interface DecodedToken extends JwtPayload {
  userId: string;
}

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

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ error: "Unauthorised - No token provided" });
      return;
    }

    const decoded = jwt.verify(token, config.JWT.SECRET) as DecodedToken;
    if (!decoded) {
      res.status(401).json({ error: "Unauthorised - Invalid token provided" });
      return;
    }

    const user = await User.getUserById(decoded.userId)
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;
