import { model, Schema } from "mongoose";

import { IUser } from "../interfaces/user.interface";

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);
export const User = model<IUser>("users", UserSchema);
