import mongoose from "mongoose";

import { IChat } from "../interfaces/chat.interface";
import { Chat } from "../models/chat.model";

class ChatRepository {
  public async findChatByUsers(user1Id: string, user2Id: string) {
    return await Chat.findOne({
      users: {
        $all: [
          new mongoose.Types.ObjectId(user1Id),
          new mongoose.Types.ObjectId(user2Id),
        ],
      },
    }).populate("users", "_id email");
  }
  public async createChat(userIds: string[]): Promise<IChat> {
    return await Chat.create({ users: userIds });
  }
  public async getAllUserChats(userId: string): Promise<IChat[]> {
    const objectUserId = new mongoose.Types.ObjectId(userId);

    return await Chat.find({ users: objectUserId })
      .populate("users", "_id email")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });
  }
  public async getChatById(chatId: string): Promise<IChat> {
    return await Chat.findById(chatId).populate("messages");
  }
}

export const chatRepository = new ChatRepository();
