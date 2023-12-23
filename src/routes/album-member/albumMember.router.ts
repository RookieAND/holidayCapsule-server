import { Router } from 'express';

import { errorCatchHandler } from '#/errors/errorCatchHandler';
import { checkLogin } from '#/middlewares/checkLogin';
import { checkRole } from '#/middlewares/checkRole';
import { validateMiddleware } from '#/middlewares/validation';

import { AlbumMemberController } from './albumMember.controller';
import { albumMemberSchema } from './albumMember.validation';

export const albumMemberRouter = Router();

albumMemberRouter.post(
    '/:albumId/new',
    checkLogin,
    checkRole({ isOwner: true }),
    validateMiddleware(albumMemberSchema.postInviteAlbumMember),
    errorCatchHandler(AlbumMemberController.postInviteAlbumMember),
);

albumMemberRouter.get(
    '/:albumId/list',
    checkLogin,
    checkRole({ isMember: true }),
    validateMiddleware(albumMemberSchema.getAlbumMemberList),
    errorCatchHandler(AlbumMemberController.getAlbumMemberList),
);

albumMemberRouter.delete(
    '/:albumId',
    checkLogin,
    checkRole({ isOwner: true }),
    validateMiddleware(albumMemberSchema.deleteAlbumMember),
    errorCatchHandler(AlbumMemberController.deleteAlbumMember),
);
