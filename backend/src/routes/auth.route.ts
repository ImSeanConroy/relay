import express from "express"
import protectRoute from "../middleware/protectRoute.js";
import { signup, login, logout, profile, updateProfile } from "../controllers/auth.controller.js"

const router = express.Router();

router.get("/profile", protectRoute, profile)
router.put("/profile", protectRoute, updateProfile)
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

export default router