import { Router } from 'express';

import { errorCatchHandler } from '#/errors/errorCatchHandler';
import { checkLogin } from '#/middlewares/checkLogin';
import { checkRole } from '#/middlewares/checkRole';
import { validateMiddleware } from '#/middlewares/validation';

import { AlbumContentController } from './albumContent.controller';
import { albumContentSchema } from './albumContent.validation';

export const albumContentRouter = Router();

albumContentRouter.post(
    '/:albumId/new',
    checkLogin,
    checkRole({ isMember: true }),
    validateMiddleware(albumContentSchema.postCreateAlbumContent),
    errorCatchHandler(AlbumContentController.postCreateAlbumContent),
);

albumContentRouter.get(
    '/:albumId/list',
    checkLogin,
    validateMiddleware(albumContentSchema.getAlbumContentList),
    errorCatchHandler(AlbumContentController.getAlbumContentList),
);

albumContentRouter.get(
    '/:albumId/:albumContentId',
    checkLogin,
    validateMiddleware(albumContentSchema.getAlbumContent),
    errorCatchHandler(AlbumContentController.getAlbumContent),
);

albumContentRouter.delete(
    '/:albumId/:albumContentId',
    checkLogin,
    checkRole({ isMember: true }),
    validateMiddleware(albumContentSchema.deleteAlbumContent),
    errorCatchHandler(AlbumContentController.deleteAlbumContent),
);

albumContentRouter.patch(
    '/:albumId/swap',
    checkLogin,
    checkRole({ isMember: true }),
    validateMiddleware(albumContentSchema.patchSwapContent),
    errorCatchHandler(AlbumContentController.patchSwapContent),
);

albumContentRouter.patch(
    '/:albumId/:albumContentId/update',
    checkLogin,
    checkRole({ isMember: true }),
    validateMiddleware(albumContentSchema.patchSwapContent),
    errorCatchHandler(AlbumContentController.patchSwapContent),
);
