import {
  IUser,
  IUserCreateDto,
  IUserUpdateDto,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async create(dto: IUserCreateDto): Promise<IUser> {
    return await User.create(dto);
  }
  public async getUserById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }
  public async updateUser(userId: string, dto: IUserUpdateDto): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }
  public async getByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email }).lean();
  }
}
export const userRepository = new UserRepository();
