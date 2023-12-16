import { Request } from 'express';
import multer from 'multer';

type FileNameCallbackFunc = (error: Error | null, filename: string) => void;

/**
 * 파일 갯수 제한 : 4개, 파일 당 사이즈 제한 : UNDER 10MB
 */
const MAX_SIZE = 1024 * 1024 * 10;
const MAX_AMOUNT = 4;

/**
 * Express의 Request body 에 존재하는 파일을 읽어 저장하도록 하는 Config
 * destination 옵션에 정의된 경로에 파일을 저장하며, callback을 통해 파일의 이름으로 저장한다.
 */
const multerConfig: multer.Options = {
  storage: multer.diskStorage({
    destination: 'tmp_files/',
    filename: function (
      _: Request,
      file: Express.Multer.File,
      callback: FileNameCallbackFunc,
    ) {
      callback(null, file.originalname);
    },
  }),
  limits: {
    fileSize: MAX_SIZE,
    files: MAX_AMOUNT,
  },
  // 일부 이미지 확장자 (jpeg, png, webp, avif, tiff) 만 허용
  fileFilter: (_, file, callback) => {
    callback(
      null,
      file.mimetype.match(/(image\/(jpeg|png|webp|avif|tiff))/)?.length !== 0,
    );
  },
};

export const multerMiddleware = multer(multerConfig);
