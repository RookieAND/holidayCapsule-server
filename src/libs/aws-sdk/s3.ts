import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';

import { InternalServerError } from '#/errors/definedErrors';

const storage = new S3Client({
  region: 'ap-northeast-2',
})

class S3StorageModule {

  static async putObject({
    file,
    presetPin,
  }: {
    file: Express.Multer.File;
    presetPin: string;
  }): Promise<string> {
    try {
      // TODO : req.files 에서 읽은 Multer File이 아닌, sharp로 변환된 파일을 읽도록 해야 함
      const originFileName = `${file.originalname.split('.')[0]}.webp`;
      const fileContent: Buffer = fs.readFileSync(`uploads/${originFileName}`);
      const fileKey = `preset/${presetPin}/${originFileName}`

      const params: PutObjectCommand = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME || '',
        Key: fileKey,
        Body: fileContent,
      });

      const result = await storage.send(params);

      if (!result)
        throw new InternalServerError(
          'S3 버킷에 파일을 업로드하는 과정에서 문제가 생겼습니다.',
        );

      await new Promise((resolve, reject) => {
        fs.unlink(`uploads/${originFileName}`, (error) => {
          return error ? reject(error) : resolve('success');
        });
      });

      return fileKey;
    } catch (error) {
      console.log(error);
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
      console.error(error);
      throw error;
    }
  }
}

export default S3StorageModule;