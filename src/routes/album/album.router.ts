import { Router } from 'express';

import { validateMiddleware } from '#/middlewares/validation';
import { checkLogin } from '#/middlewares/checkLogin';

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
    validateMiddleware(albumSchema.deleteAlbum),
    AlbumController.deleteAlbum,
);

albumRouter.patch(
    '/:albumId',
    validateMiddleware(albumSchema.patchModifyAlbum),
    AlbumController.patchModifyAlbum,
)