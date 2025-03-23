import { Router } from "express";

import { fileConfig } from "../constans/image.constans";
import { messageController } from "../controllers/message.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { fileMiddleware } from "../middlewares/file.middleware";

const router = Router();
router.get("/", authMiddleware.checkAccessToken, messageController.getMessages);
router.post(
  "/createMessage",
  authMiddleware.checkAccessToken,
  messageController.createMessage,
);
router.put(
  "/:messageId",
  authMiddleware.checkAccessToken,
  messageController.updateMessage,
);
router.delete(
  "/:messageId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isValid("messageId"),
  messageController.deleteMessage,
);
router.post(
  "/uploadFiles",
  authMiddleware.checkAccessToken,
  fileMiddleware.isFileValid("file", fileConfig),
  messageController.uploadFile,
);

export const sendMessageRouter = router;
