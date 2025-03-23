import { Router } from "express";

import { chatController } from "../controllers/chat.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.post("/", authMiddleware.checkAccessToken, chatController.createChat);
router.get(
  "/",
  authMiddleware.checkAccessToken,
  chatController.getAllUserChats,
);
router.get(
  "/:chatId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isValid("chatId"),
  chatController.getChatById,
);

export const chatRouter = router;
