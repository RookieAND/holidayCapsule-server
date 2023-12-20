import { Router } from 'express';

import { errorCatchHandler } from '#/errors/errorCatchHandler';
import { validateMiddleware } from '#/middlewares/validation';

import { AuthController } from './auth.controller';
import { authSchema } from './auth.validation';

export const authRouter = Router();

authRouter.post(
    '/login',
    validateMiddleware(authSchema.postLogin),
    errorCatchHandler(AuthController.postLogin),
);
