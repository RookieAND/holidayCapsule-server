import { NextFunction, Request, Response } from 'express';
import { logger } from '#/libs/logger/winstonLogger';

import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '#/errors/definedErrors';

/**
 * 에러의 종류에 따라 다른 HTTP Status와 메세지를 보내는 에러 핸들러 errorHandler
 */
const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction,
) => {

  logger.error(err);

  if (err instanceof BadRequestError) {
    next(err);
    return res.status(400).json({ errorMessage: err.message });
  }
  if (err instanceof UnauthorizedError) {
    next(err);
    return res.status(401).json({ errorMessage: err.message });
  }
  if (err instanceof ForbiddenError) {
    next(err);
    return res.status(403).json({ errorMessage: err.message });
  }
  if (err instanceof NotFoundError) {
    next(err);
    return res.status(404).json({ errorMessage: err.message });
  }

  // 나머지 경우는 500 : Internal Server Error로 처리해야 함.
  next(err);
  return res.status(500).json({ errorMessage: 'Invaild Server Error', metadata: err.stack });
};

export default errorHandler;