import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import {
  IUserCreateDto,
  IUserLoginDto,
  IUserResponse,
} from "../interfaces/user.interface";
import { userPresenter } from "../presenters/user.presenter";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.servise";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
  public async register(
    dto: IUserCreateDto,
  ): Promise<{ user: IUserResponse; tokens: ITokenPair }> {
    await userService.isEmailUnique(dto.email);
    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.create({ ...dto, password });
    const tokens = tokenService.generateTokens({
      userId: user._id,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user: userPresenter.toResponse(user), tokens };
  }
  public async login(
    dto: IUserLoginDto,
  ): Promise<{ user: IUserResponse; tokens: ITokenPair }> {
    const user = await userRepository.getByEmail(dto.email);
    const isPasswordCorrect = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Incorrect email or password", 401);
    }
    const tokens = tokenService.generateTokens({
      userId: user._id,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user: userPresenter.toResponse(user), tokens };
  }
  public async refresh(
    tokenPayload: ITokenPayload,
    refreshToken: string,
  ): Promise<ITokenPair> {
    const existingToken = await tokenRepository.findByParams({ refreshToken });
    if (!existingToken) {
      throw new ApiError("Invalid refresh token", 401);
    }
    await tokenRepository.deleteOneByParams({ refreshToken });
    const tokens = tokenService.generateTokens({
      userId: tokenPayload.userId,
    });
    await tokenRepository.create({ ...tokens, _userId: tokenPayload.userId });
    return tokens;
  }
}
export const authService = new AuthService();
