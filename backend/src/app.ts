import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import conversationRoutes from "./routes/conversation.route.js";
import messageRoutes from "./routes/message.route.js";
import { errorHandler } from "./middleware/error-handler.js";
import { HTTPSTATUS } from "./constants/http.config.js";
import protectRoute from "./middleware/protect-route.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/api/health", async (req: Request, res: Response) => {
  res.status(HTTPSTATUS.OK).json({
    message: "Hello, World!",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", protectRoute ,userRoutes);
app.use("/api/conversations", protectRoute, conversationRoutes);
app.use("/api/messages", messageRoutes);

app.use(errorHandler);

// Export the app for use in `index.ts` and tests
export default app;
