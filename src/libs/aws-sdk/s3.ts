import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import fs from 'fs';

import { InternalServerError } from '#/errors/definedErrors';
import { logger } from '#/libs/logger';

const storage = new S3Client({
  region: 'ap-northeast-2',
});

class S3StorageModule {
  static async putObject({
    file,
    fileKey,
  }: {
    file: Express.Multer.File;
    fileKey: string;
  }): Promise<string> {
    try {
      const params: PutObjectCommand = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME || '',
        Key: fileKey,
        Body: file.buffer,
      });

      const result = await storage.send(params);

      if (!result)
        throw new InternalServerError(
          'S3 버킷에 파일을 업로드하는 과정에서 문제가 생겼습니다.',
        );

      return fileKey;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  static async deleteObject(key: string) {
    try {
      const params: DeleteObjectCommand = new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME || '',
        Key: key.replace(`${process.env.CLOUDFRONT_URL}/`, ''),
      });
      const result = await storage.send(params);
      return result;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

export default S3StorageModule;
