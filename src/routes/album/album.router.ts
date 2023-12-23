import { Router } from 'express';

import { errorCatchHandler } from '#/errors/errorCatchHandler';
import { checkLogin } from '#/middlewares/checkLogin';
import { checkRole } from '#/middlewares/checkRole';
import { validateMiddleware } from '#/middlewares/validation';

import { AlbumController } from './album.controller';
import { albumSchema } from './album.validation';

export const albumRouter = Router();

albumRouter.post(
    '/new',
    checkLogin,
    validateMiddleware(albumSchema.postCreateAlbum),
    errorCatchHandler(AlbumController.postCreateAlbum),
);

albumRouter.get(
    '/list',
    checkLogin,
    errorCatchHandler(AlbumController.getAlbumList),
);

albumRouter.delete(
    '/:albumId',
    checkLogin,
    checkRole({ isOwner: true }),
    validateMiddleware(albumSchema.deleteAlbum),
    errorCatchHandler(AlbumController.deleteAlbum),
);

albumRouter.patch(
    '/:albumId',
    checkLogin,
    checkRole({ isOwner: true }),
    validateMiddleware(albumSchema.patchModifyAlbum),
    errorCatchHandler(AlbumController.patchModifyAlbum),
);

albumRouter.get(
    '/:albumId',
    checkLogin,
    checkRole({ isMember: true }),
    validateMiddleware(albumSchema.getAlbum),
    errorCatchHandler(AlbumController.getAlbum),
);
