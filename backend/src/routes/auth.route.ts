import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  signup,
  login,
  logout,
  profile,
  updateProfile,
  deleteUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/profile", protectRoute, profile);
router.put("/profile", protectRoute, updateProfile);
router.delete("/profile", protectRoute, deleteUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
