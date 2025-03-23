import { ApiError } from "../errors/api-error";
import { IChat } from "../interfaces/chat.interface";
import { chatRepository } from "../repositories/chat.repository";
import { userRepository } from "../repositories/user.repository";

class ChatService {
  public async createChat(userId: string, email: string): Promise<IChat> {
    if (!email) {
      throw new ApiError("Enter the user's email", 401);
    }
    const otherUser = await userRepository.getByEmail(email);
    if (!otherUser) {
      throw new ApiError("User not found", 401);
    }
    if (otherUser._id.toString() === userId) {
      throw new ApiError("You cannot create a chat with yourself.", 401);
    }
    const existingChat = await chatRepository.findChatByUsers(
      userId,
      otherUser._id.toString(),
    );
    if (existingChat) {
      return existingChat;
    }
    return await chatRepository.createChat([userId, otherUser._id.toString()]);
  }
  public async getAllUserChats(userId: string): Promise<IChat[]> {
    return await chatRepository.getAllUserChats(userId);
  }
  public async getChatById(chatId: string): Promise<IChat> {
    return await chatRepository.getChatById(chatId);
  }
}

export const chatService = new ChatService();
