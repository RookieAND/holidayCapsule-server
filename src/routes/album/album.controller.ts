import type { AlbumSchema } from '#/routes/album/album.validation';
import { AlbumService } from '#/service/album';
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

    static postCreateInvitation: ValidatedRequestHandler<
        AlbumSchema['postCreateInvitation']
    > = async (req, res) => {
        const { dueDate } = req.body;
        const { albumId } = req.params;

        const createdInvitationCode = await AlbumService.createInvitation({
            dueDate,
            albumId,
        });

        return res.status(201).json({ item: createdInvitationCode });
    };

    static deleteAlbum: ValidatedRequestHandler<AlbumSchema['deleteAlbum']> =
        async (req, res) => {
            const { albumId } = req.params;

            const deleteResult = await AlbumService.deleteAlbum({
                albumId,
            });

            // NOTE : 삭제된 컬렉션이 없다면 No Content (204) 반환
            return res.sendStatus(deleteResult ? 200 : 204);
        };

    static deleteInvitation: ValidatedRequestHandler<
        AlbumSchema['deleteInvitation']
    > = async (req, res) => {
        const { albumId } = req.params;

        const deleteResult = await AlbumService.deleteInvitation({
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

        const updateResult = await AlbumService.modifyAlbum({
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

    static getAlbumList: ValidatedRequestHandler = async (_, res) => {
        const { userId } = res.locals;

        const items = await AlbumService.getAlbumList({
            ownerId: userId,
        });

        return res.status(200).json({ items });
    };
}
