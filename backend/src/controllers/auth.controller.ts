import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfaces/token.interface";
import { IUserCreateDto, IUserLoginDto } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUserCreateDto;
      const result = await authService.register(dto);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUserLoginDto;
      const result = await authService.login(dto);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = res.locals.tokenPayload as ITokenPayload;
      const refreshToken = res.locals.refreshToken;
      const result = await authService.refresh(tokenPayload, refreshToken);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}
export const authController = new AuthController();
