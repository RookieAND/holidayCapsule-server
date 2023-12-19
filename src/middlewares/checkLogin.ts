import type { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import type { JwtPayload } from 'jsonwebtoken';

import { UnauthorizedError } from '#/errors/definedErrors';
import { JsonwebtokenModule } from '#/libs/jsonwebtoken';
import { userModel } from '#/models/user';


// TODO : res.locals 가 타입 추론이 되도록 이후 미들웨어에서의 제어 필요
interface ResponseLocalQuery {
    [key: string]: unknown;
    userId: string | JwtPayload;
}

export const checkLogin: RequestHandler<
    ParamsDictionary,
    unknown,
    unknown,
    qs.ParsedQs,
    ResponseLocalQuery
> = async (req, res, next) => {
    const accessToken = req.headers.authorization?.split('Bearer ')[1];

    if (!accessToken) {
        throw new UnauthorizedError('요청에 사용자 정보가 없습니다.');
    }

    const userId = JsonwebtokenModule.verifyJsonWebToken(accessToken);

    if (!userId) {
        throw new UnauthorizedError('인가 받은 토큰이 유효하지 않습니다.');
    }

    const user = await userModel.findOne({ id: userId });

    if (!user) {
        throw new UnauthorizedError('유효하지 않은 사용자 정보입니다.');
    }

    res.locals.userId = userId;
    next();
};
