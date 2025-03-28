import express from "express";
import {
  loginHandler,
  signupHandler,
  logoutHandler,
  verifyEmailHandler,
  forgotPasswordHandler,
  passwordResetHandler,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signupHandler);
router.post("/login", loginHandler);
router.post("/logout", logoutHandler);
router.post("/password-forgot", forgotPasswordHandler);
router.post("/password-reset", passwordResetHandler);
router.get("/verify-email/:code", verifyEmailHandler);

export default router;
