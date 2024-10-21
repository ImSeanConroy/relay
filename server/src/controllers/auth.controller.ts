import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import prisma from "../db/prisma.js";
import generateImage from "../utils/generateImage.js";
import generateToken from "../utils/generateToken.js";

// @description   Signup user
// @route         POST /api/auth/signup
// @access        Public
export const signup = async (req: Request, res: Response) => {
  try {
    const { fullname, username, password, confirmPassword } = req.body;
    if (!fullname || !username || !password || !confirmPassword) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const profilePicture = generateImage();

    const newUser = await prisma.user.create({
      data: { fullname, username, password: hashedPassword, profilePicture },
    });

    if (newUser) {
      generateToken(newUser.id, res);

      res.status(201).json({
        id: newUser.id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePicture: newUser.profilePicture,
      });
    } else {
      res.status(400).json({ error: "Invalid uset data" });
    }
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @description   Login user
// @route         POST /api/auth/login
// @access        Public
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ error: "Invalid credentials" });

    generateToken(user.id, res);

    res.status(201).json({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      profilePicture: user.profilePicture,
    });
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @description   Logout user
// @route         POST /api/auth/logout
// @access        Public
export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @description   Logout user
// @route         GET /api/auth/profile
// @access        Public
export const profile = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(201).json({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
