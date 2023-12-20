import { RequestHandler } from 'express-serve-static-core';

import type { AlbumSchema } from '#/routes/album/album.validation';
import { AlbumService } from '#/service/album/album.service';
import { ValidatedRequestHandler } from '#/types/validation';

export class AlbumController {
    static postCreateAlbum: ValidatedRequestHandler<
        AlbumSchema['postCreateAlbum']
    > = async (req, res) => {
        const { name } = req.body;
        const { userId } = res.locals;

        const createdAlbum = await AlbumService.createAlbum({
            ownerId: userId as string,
            name,
        });

        return res.status(201).json({ item: createdAlbum });
    };

    static deleteAlbum: ValidatedRequestHandler<AlbumSchema['deleteAlbum']> =
        async (req, res) => {
            const { albumId } = req.params;
            const { userId } = res.locals;

            const deleteResult = await AlbumService.deleteAlbum({
                ownerId: userId,
                albumId,
            });

            // NOTE : 삭제된 컬렉션이 없다면 No Content (204) 반환
            return res.sendStatus(deleteResult ? 200 : 204);
        };

    static patchModifyAlbum: ValidatedRequestHandler<
        AlbumSchema['patchModifyAlbum']
    > = async (req, res) => {
        const { albumId } = req.params;
        const { name } = req.body;
        const { userId } = res.locals;

        const updateResult = await AlbumService.modifyAlbum({
            ownerId: userId,
            albumId,
            name,
        });

        // NOTE : 업데이트 된 컬렉션이 없다면 No Content (204) 반환
        return res.sendStatus(updateResult ? 200 : 204);
    };

    static getAlbum: ValidatedRequestHandler<AlbumSchema['getAlbum']> = async (
        req,
        res,
    ) => {
        const { albumId } = req.params;
        const { userId } = res.locals;

        const item = await AlbumService.getAlbum({
            albumId,
            ownerId: userId,
        });

        return res.status(200).json({ item });
    };

    static getAlbumList: RequestHandler = async (_, res) => {
        const { userId } = res.locals;

        const items = await AlbumService.getAlbumList({
            ownerId: userId,
        });

        return res.status(200).json({ items });
    };
}
