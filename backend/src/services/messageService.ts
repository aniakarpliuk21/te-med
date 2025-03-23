import { UploadedFile } from "express-fileupload";

import { FileItemTypeEnum } from "../enums/file-item-type.enum";
import { ApiError } from "../errors/api-error";
import {
  IMessage,
  IMessageCreateDto,
  IMessageUpdateDto,
} from "../interfaces/message.interface";
import { messageRepository } from "../repositories/message.repository";
import { s3Service } from "./s3";

class MessageService {
  public async createMessage(dto: IMessageCreateDto): Promise<IMessage> {
    if (dto.files && dto.files.length > 0) {
      const file = dto.files[0];
      if (typeof file === "string") {
        throw new ApiError("Invalid file format", 400);
      }
      const fileUrl = await s3Service.uploadFile(
        file,
        FileItemTypeEnum.MESSAGE,
        dto._userId.toString(),
      );
      dto.files = [fileUrl];
    }

    return await messageRepository.createMessage(dto);
  }

  public async updateMessage(
    messageId: string,
    dto: IMessageUpdateDto,
  ): Promise<IMessage> {
    const message = await messageRepository.getMessageById(messageId);
    if (!message) {
      throw new ApiError("Message not found", 404);
    }
    return await messageRepository.updateMessage(messageId, dto);
  }
  public async deleteMessage(messageId: string): Promise<void> {
    const message = await messageRepository.getMessageById(messageId);
    if (!message) {
      throw new ApiError("Message not found", 404);
    }
    await messageRepository.deleteMessage(messageId);
  }
  public async uploadFiles(
    userId: string,
    chatId: string,
    files: UploadedFile | UploadedFile[],
    content?: string,
  ): Promise<IMessage> {
    const fileArray = Array.isArray(files) ? files : [files];
    const uploadedFileUrls = await Promise.all(
      fileArray.map(async (file) => {
        return await s3Service.uploadFile(
          file,
          FileItemTypeEnum.MESSAGE,
          userId,
        );
      }),
    );
    return await messageRepository.createMessage({
      _userId: userId,
      _chatId: chatId,
      content: content || "",
      files: uploadedFileUrls,
    });
  }
}
export const messageService = new MessageService();
