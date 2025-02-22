import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";
import { initializeSocket } from "./socket/socket.js";
import pool from "./config/db.js";

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
const io = initializeSocket(server);

pool
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL Database using Pool");
    server.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  })
  .catch((err) => console.error("Connection error", err.stack));
