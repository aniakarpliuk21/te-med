import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors/api-error";
import { IMessageUpdateDto } from "../interfaces/message.interface";
import { Chat } from "../models/chat.model";
import { Message } from "../models/message.model";
import { messageService } from "../services/messageService";

class MessageController {
  public async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const chatId = req.query.chatId as string;
      const messages = await Message.find({ _chatId: chatId });
      res.json(messages);
    } catch (e) {
      next(e);
    }
  }
  public async createMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { content, _userId, _chatId } = req.body;
      if (!_userId) {
        return next(new ApiError("Unauthorized", 401));
      }
      if (!_chatId) {
        return next(new ApiError("Chat ID is required", 400));
      }

      const newMessage = await messageService.createMessage({
        content,
        _chatId,
        _userId,
      });

      await Chat.findByIdAndUpdate(_chatId, {
        $push: { messages: newMessage._id },
        lastMessage: newMessage._id,
      });

      res.status(201).json(newMessage);
    } catch (e) {
      next(e);
    }
  }

  public async updateMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const messageId = req.params.messageId;
      const dto = req.body as IMessageUpdateDto;
      const result = await messageService.updateMessage(messageId, dto);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async deleteMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const messageId = req.params.messageId;
      await messageService.deleteMessage(messageId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      const { _chatId, _userId, content } = req.body;
      const file = req.files?.file as UploadedFile;
      if (!file) {
        throw new ApiError("File not found", 400);
      }
      const fileUrl = await messageService.uploadFiles(
        _userId,
        _chatId,
        file,
        content,
      );
      res.status(201).json(fileUrl);
    } catch (e) {
      next(e);
    }
  }
}

export const messageController = new MessageController();
