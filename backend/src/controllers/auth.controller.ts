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
    const { fullname, email, password, confirmPassword } = req.body;
    if (!fullname || !email || !password || !confirmPassword) {
      res.status(400).json({ error: "Please fill in all fields" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ error: "Passwords don't match" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const profilePicture = generateImage();

    const newUser = await prisma.user.create({
      data: { fullname, email, password: hashedPassword, profilePicture },
    });

    if (newUser) {
      generateToken(newUser.id, res);

      res.status(201).json({
        id: newUser.id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
        status: newUser.status,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
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
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Please fill in all fields" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    generateToken(user.id, res);

    res.status(201).json({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      profilePicture: user.profilePicture,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
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
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @description   Get user profile
// @route         GET /api/auth/profile
// @access        Public
export const profile = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(201).json({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      profilePicture: user.profilePicture,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @description   Update user profile
// @route         PUT /api/auth/profile
// @access        Private
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { fullname, email, profilePicture, status } = req.body;
    const userId = req.user.id;

    if (!fullname && !email && !profilePicture && !status) {
      return res.status(400).json({ error: "No data provided to update" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        fullname: fullname || user.fullname,
        email: email || user.email,
        profilePicture: profilePicture || user.profilePicture,
        status: status || user.status
      },
    });

    res.status(200).json({
      id: updatedUser.id,
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
      status: updatedUser.status,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    });
  } catch (error: any) {
    console.log("Error in updateProfile controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
