import { Server as SocketIOServer } from "socket.io";
import { InternalServerException } from "../utils/catch-error.js";

let io: SocketIOServer | null = null;

export const setIO = (socketInstance: SocketIOServer) => {
  io = socketInstance;
};

export const getIO = (): SocketIOServer => {
  if (!io) {
    throw new InternalServerException("Socket.IO instance is not initialized");
  }
  return io;
};
