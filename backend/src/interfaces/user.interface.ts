export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export type IUserCreateDto = Pick<IUser, "username" | "email" | "password">;

export type IUserUpdateDto = Pick<IUser, "username">;

export type IUserLoginDto = Pick<IUser, "email" | "password">;

export type IUserResponse = Pick<
  IUser,
  | "_id"
  | "username"
  | "email"
  | "isDeleted"
  | "isVerified"
  | "createdAt"
  | "updatedAt"
>;
