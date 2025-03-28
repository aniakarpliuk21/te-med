import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();
router.post(
  "/register",
  commonMiddleware.validateBody(UserValidator.create),
  authController.register,
);
router.post(
  "/login",
  commonMiddleware.validateBody(UserValidator.login),
  authController.login,
);
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

export const authRouter = router;
