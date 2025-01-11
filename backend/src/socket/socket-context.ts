import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer | null = null;

export const setIO = (socketInstance: SocketIOServer) => {
  io = socketInstance;
};

export const getIO = (): SocketIOServer => {
  if (!io) {
    throw new Error("Socket.IO instance is not initialized");
  }
  return io;
};
