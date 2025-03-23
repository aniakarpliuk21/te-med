import { NextFunction, Request, Response } from "express";

import { chatService } from "../services/chat.service";

class ChatController {
  public async createChat(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const { userId } = res.locals;
      const result = await chatService.createChat(userId, email);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getAllUserChats(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = res.locals.userId;
      const chats = await chatService.getAllUserChats(userId);
      res.json(chats);
    } catch (e) {
      next(e);
    }
  }
  public async getChatById(req: Request, res: Response, next: NextFunction) {
    try {
      const chatId = req.params.chatId;
      const response = await chatService.getChatById(chatId);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}

export const chatController = new ChatController();
