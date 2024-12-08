import express from "express"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

import { app, server } from "./socket/socket.js"

import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cookieParser())

app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT)
})