import mongoose, { model, Schema } from "mongoose";

import { IChat } from "../interfaces/chat.interface";
import { User } from "./user.model";

const chatSchema = new Schema<IChat>(
  {
    users: [
      { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    ],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  { timestamps: true, versionKey: false },
);

export const Chat = model<IChat>("Chat", chatSchema);
