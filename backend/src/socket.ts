import { Server } from "socket.io";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
    });
    socket.on("sendMessage", (messageData) => {
      io.to(messageData.chatId).emit("receiveMessage", messageData);
    });
    socket.on("disconnect", () => {});
  });
};
