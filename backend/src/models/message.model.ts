import { model, Schema } from "mongoose";

import { IMessage } from "../interfaces/message.interface";
import { Chat } from "./chat.model";
import { User } from "./user.model";

const messageSchema = new Schema<IMessage>(
  {
    content: { type: String, default: "" },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
    _chatId: { type: Schema.Types.ObjectId, required: true, ref: Chat },
    files: {
      type: [String],
      default: [],
    },
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);
export const Message = model<IMessage>("Message", messageSchema);
