import { Router } from 'express';

import { errorCatchHandler } from '#/errors/errorCatchHandler';
import { checkLogin } from '#/middlewares/checkLogin';
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
    validateMiddleware(albumSchema.deleteAlbum),
    errorCatchHandler(AlbumController.deleteAlbum),
);

albumRouter.patch(
    '/:albumId',
    checkLogin,
    validateMiddleware(albumSchema.patchModifyAlbum),
    errorCatchHandler(AlbumController.patchModifyAlbum),
);

albumRouter.get(
    '/:albumId',
    checkLogin,
    validateMiddleware(albumSchema.getAlbum),
    errorCatchHandler(AlbumController.getAlbum),
);
