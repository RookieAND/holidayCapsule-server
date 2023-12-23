import { Router } from 'express';

import { errorCatchHandler } from '#/errors/errorCatchHandler';
import { checkLogin } from '#/middlewares/checkLogin';
import { validateMiddleware } from '#/middlewares/validation';

import { AlbumMemberController } from './albumMember.controller';
import { albumMemberSchema } from './albumMember.validation';

export const albumContentRouter = Router();

albumContentRouter.post(
    '/:albumId/new',
    checkLogin,
    validateMiddleware(albumMemberSchema.postInviteAlbumMember),
    errorCatchHandler(AlbumMemberController.postInviteAlbumMember),
);

albumContentRouter.get(
    '/:albumId/list',
    checkLogin,
    validateMiddleware(albumMemberSchema.getAlbumMemberList),
    errorCatchHandler(AlbumMemberController.getAlbumMemberList),
);

albumContentRouter.delete(
    '/:albumId/:albumContentId',
    checkLogin,
    validateMiddleware(albumMemberSchema.deleteAlbumMember),
    errorCatchHandler(AlbumMemberController.deleteAlbumMember),
);