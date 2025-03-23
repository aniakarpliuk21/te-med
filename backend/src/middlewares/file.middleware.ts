import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ImageConfigType } from "../constans/image.constans";
import { ApiError } from "../errors/api-error";

class FileMiddleware {
  public isFileValid(key: string, config: ImageConfigType) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const files = req.files?.[key] as UploadedFile | UploadedFile[];
        if (!files) {
          throw new ApiError("File(s) not found", 400);
        }
        const fileArray = Array.isArray(files) ? files : [files];
        for (const file of fileArray) {
          if (!config.types.includes(file.mimetype)) {
            throw new ApiError("Invalid file type", 400);
          }
          if (file.size > config.size) {
            throw new ApiError("Invalid file size", 400);
          }
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const fileMiddleware = new FileMiddleware();
