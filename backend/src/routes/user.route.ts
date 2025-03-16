import express from "express";
import { getUserHandler, updateUserHandler, deleteUserHandler } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", getUserHandler);
router.put("/profile", updateUserHandler);
router.delete("/profile", deleteUserHandler);

export default router;
