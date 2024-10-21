import { Router } from "express"

const router = Router()

// @description   Login user
// @route         GET /api/conversation/login
// @access        Private
router.get("/conversations", (req, res) => {
  res.send("Conversation Route")
})

export default router