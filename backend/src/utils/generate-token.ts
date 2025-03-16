import { Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../constants/app.config.js";

const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, config.JWT.SECRET, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  })

  return token
};

export default generateToken;
