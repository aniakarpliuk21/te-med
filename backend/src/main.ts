import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import { createServer } from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";

import { configure } from "./configure/configure";
import { ApiError } from "./errors/api-error";
import { authRouter } from "./routers/auth.router";
import { chatRouter } from "./routers/chat.router";
import { sendMessageRouter } from "./routers/sendMessage.router";
import { setupSocket } from "./socket";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

setupSocket(io);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(fileUpload());
app.use("/auth", authRouter);
app.use("/messages", sendMessageRouter);
app.use("/chats", chatRouter);

app.use(
  "*",
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = error.status ?? 500;
    const message = error.message ?? "Something went wrong";
    res.status(status).json({ status, message });
  },
);

process.on("uncaughtException", (error: ApiError) => {
  console.error("Uncaught Exception", error);
  process.exit(1);
});

const connectToDB = async () => {
  let dbCon = false;
  while (!dbCon) {
    try {
      console.log("Connecting to database...");
      await mongoose.connect(configure.mongoUrl);
      dbCon = true;
      console.log("Database available!");
    } catch (e) {
      console.error("Database unavailable, wait 3 sec", e);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
};

const start = async () => {
  try {
    await connectToDB();
    server.listen(configure.port, () => {
      console.log(`Server has been started on port ${configure.port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
