import { randomUUID } from "node:crypto";
import path from "node:path";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";

import { configure } from "../configure/configure";
import { FileItemTypeEnum } from "../enums/file-item-type.enum";

class S3Service {
  constructor(
    private readonly client = new S3Client({
      region: configure.AWS_REGION,
      credentials: {
        accessKeyId: configure.AWS_ACCESS_KEY,
        secretAccessKey: configure.AWS_SECRET_KEY,
      },
    }),
  ) {}

  public async uploadFile(
    file: UploadedFile,
    itemType: FileItemTypeEnum,
    itemId: string,
  ): Promise<string> {
    try {
      const filePath = this.buildPath(itemType, itemId, file.name);
      await this.client.send(
        new PutObjectCommand({
          Bucket: configure.AWS_S3_BUCKET_NAME,
          Key: filePath,
          Body: file.data,
          ContentType: file.mimetype,
          ACL: configure.AWS_S3_ACL,
        }),
      );
      return `https://${configure.AWS_S3_BUCKET_NAME}.s3.${configure.AWS_REGION}.amazonaws.com/${filePath}`;
    } catch (error) {
      console.error("Error upload: ", error);
    }
  }

  private buildPath(
    itemType: FileItemTypeEnum,
    itemId: string,
    fileName: string,
  ): string {
    return `${itemType}/${itemId}/${randomUUID()}${path.extname(fileName)}`;
  }
}

export const s3Service = new S3Service();
