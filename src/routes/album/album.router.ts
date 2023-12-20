import { Router } from 'express';

import { checkLogin } from '#/middlewares/checkLogin';
import { validateMiddleware } from '#/middlewares/validation';

import { AlbumController } from './album.controller';
import { albumSchema } from './album.validation';

export const albumRouter = Router();

albumRouter.post(
    '/new',
    checkLogin,
    validateMiddleware(albumSchema.postCreateAlbum),
    AlbumController.postCreateAlbum,
);

albumRouter.delete(
    '/:albumId',
    checkLogin,
    validateMiddleware(albumSchema.deleteAlbum),
    AlbumController.deleteAlbum,
);

albumRouter.patch(
    '/:albumId',
    checkLogin,
    validateMiddleware(albumSchema.patchModifyAlbum),
    AlbumController.patchModifyAlbum,
);

albumRouter.get(
    '/:albumId',
    checkLogin,
    validateMiddleware(albumSchema.getAlbum),
    AlbumController.getAlbum,
);

albumRouter.get('/list', checkLogin, AlbumController.getAlbumList);

