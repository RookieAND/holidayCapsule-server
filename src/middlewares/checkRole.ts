import type { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import type { JwtPayload } from 'jsonwebtoken';

import {
    BadRequestError,
    ForbiddenError,
    UnauthorizedError,
} from '#/errors/definedErrors';
import { albumModel } from '#/models/album';
import { albumMemberModel } from '#/models/album-member';
import { albumMemberEnum } from '#/models/album-member/schema';
import { userModel } from '#/models/user';

type ResponseLocalQuery = {
    [key: string]: unknown;
    userId: string | JwtPayload;
};

type RequestCheckRole = {
    isOwner?: boolean;
    isMember?: boolean;
};

// Param 에 들어간 AlbumId 과 User Id 를 기반으로 권한에 맞는 요청을 보냈는지 판별하는 Middleware checkRole
export const checkRole: ({
    isOwner,
}: RequestCheckRole) => RequestHandler<
    ParamsDictionary,
    unknown,
    unknown,
    qs.ParsedQs,
    ResponseLocalQuery
> =
    ({ isOwner, isMember }) =>
    async (req, res, next) => {
        const { userId } = res.locals;
        const { albumId } = req.params;

        const isValidUser = await userModel.exists({ id: userId });

        if (!isValidUser) {
            throw new BadRequestError('유효하지 않은 유저 ID 입니다.');
        }

        const isValidAlbum = await albumModel.exists({ id: albumId });

        if (!isValidAlbum) {
            throw new BadRequestError('유효하지 않은 앨범 ID 입니다.');
        }

        // NOTE : 앨범에 소속된 유저가 아니어도 된다면 다음 미들웨어로 이동
        if (!isOwner && !isMember) {
            return next();
        }

        const albumMember = await albumMemberModel.findOne({ albumId, userId });

        if (!albumMember) {
            throw new UnauthorizedError(
                '앨범에 소속된 멤버만 가능한 요청입니다.',
            );
        }

        if (isOwner && albumMember.role !== albumMemberEnum.role.OWNER) {
            throw new ForbiddenError('앨범의 소유주만 가능한 요청입니다.');
        }

        next();
    };
