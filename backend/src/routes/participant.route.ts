import express from "express";
import {
  addParticipantsHandler,
  removeParticipantsHandler,
} from "../controllers/participants.controller.js";
import verifyParticipant from "../middleware/verify-participant.js";

const router = express.Router();

router.post("/", verifyParticipant, addParticipantsHandler);
router.delete("/", verifyParticipant, removeParticipantsHandler);

export default router;
