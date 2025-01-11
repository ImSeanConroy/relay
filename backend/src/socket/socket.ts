import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";
import { setIO } from "./socket-context.js";

const userSocketMap: { [key: string]: string } = {};

export const getReceiverSocketId = (recieverId: string) => {
  return userSocketMap[recieverId];
};

export const initializeSocket = (server: HttpServer): SocketIOServer => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
    },
  });

  setIO(io);

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId as string;
    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};
