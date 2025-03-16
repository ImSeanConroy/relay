import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";
import { initializeSocket } from "./socket/socket.js";
import pool from "./config/db.js";
import { config } from "./constants/app.config.js";

const PORT = config.PORT;

const server = http.createServer(app);
const io = initializeSocket(server);

pool
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL Database using Pool");
    server.listen(PORT, () => {
      console.log(`Server is listening on port ${config.PORT} in ${config.NODE_ENV} environment`);
    });
  })
  .catch((err) => console.error("Connection error", err.stack));
