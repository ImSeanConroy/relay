import http from "http";
import app from "./app.js";
import dotenv from "dotenv"
import { initializeSocket } from "./socket/socket.js";

dotenv.config()

const PORT = process.env.PORT || 3001

const server = http.createServer(app);
const io = initializeSocket(server);

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT)
})