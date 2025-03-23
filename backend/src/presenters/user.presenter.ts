import { IUser, IUserResponse } from "../interfaces/user.interface";

class UserPresenter {
  public toResponse(entity: IUser): IUserResponse {
    return {
      _id: entity._id,
      username: entity.username,
      email: entity.email,
      isDeleted: entity.isDeleted,
      isVerified: entity.isVerified,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
export const userPresenter = new UserPresenter();
