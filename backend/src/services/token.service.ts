import * as jwt from "jsonwebtoken";

import { configure } from "../configure/configure";
import { TokenEnum } from "../enums/token.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
  public generateTokens(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, configure.jwtAccessSecret, {
      expiresIn: "7d",
    });
    const refreshToken = jwt.sign(payload, configure.jwtRefreshSecret, {
      expiresIn: "7d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  public verifyToken(token: string, type: TokenEnum): ITokenPayload {
    try {
      let secret: string;
      if (type === TokenEnum.ACCESS) {
        secret = secret = configure.jwtAccessSecret;
      }
      if (type === TokenEnum.REFRESH) {
        secret = configure.jwtRefreshSecret;
      }
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      console.error(e);
      throw new ApiError("Invalid token", 401);
    }
  }
}
export const tokenService = new TokenService();
