import { Types } from "mongoose";

export interface IMessage {
  _id: string;
  _userId: Types.ObjectId | string;
  _chatId: Types.ObjectId | string;
  content: string;
  files?: string[];
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export type IMessageCreateDto = Pick<
  IMessage,
  "content" | "files" | "_chatId" | "_userId"
>;

export type IMessageUpdateDto = Pick<IMessage, "content">;
