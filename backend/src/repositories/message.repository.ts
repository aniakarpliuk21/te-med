import { Types } from "mongoose";

import {
  IMessage,
  IMessageCreateDto,
  IMessageUpdateDto,
} from "../interfaces/message.interface";
import { Message } from "../models/message.model";

class MessageRepository {
  public async createMessage(dto: IMessageCreateDto): Promise<IMessage> {
    return await Message.create({
      ...dto,
      chatId:
        typeof dto._chatId === "string"
          ? new Types.ObjectId(dto._chatId)
          : dto._chatId,
    });
  }
  public async deleteMessage(messageId: string): Promise<void> {
    await Message.deleteOne({ _id: messageId });
  }
  public async updateMessage(
    messageId: string,
    dto: IMessageUpdateDto,
  ): Promise<IMessage> {
    return await Message.findByIdAndUpdate(messageId, dto, { new: true });
  }
  public async getMessageById(messageId: string): Promise<IMessage> {
    return await Message.findById(messageId);
  }
}
export const messageRepository = new MessageRepository();
