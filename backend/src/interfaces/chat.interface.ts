import mongoose from "mongoose";

import { IMessage } from "./message.interface";
import { IUser } from "./user.interface";

export interface IChat extends mongoose.Document {
  users: IUser[];
  messages: IMessage[];
  lastMessage?: IMessage;
  updatedAt: Date;
}
