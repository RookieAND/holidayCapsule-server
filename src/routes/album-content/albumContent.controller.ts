import type { AlbumContentSchema } from '#/routes/album-content/albumContent.validation';
import { AlbumContentService } from '#/service/album-content';
import { ValidatedRequestHandler } from '#/types/validation';

export class AlbumContentController {
    static postCreateAlbumContent: ValidatedRequestHandler<
        AlbumContentSchema['postCreateAlbumContent']
    > = async (req, res) => {
        const { imageFileKey, eventDate, content } = req.body;
        const { albumId } = req.params;
        const { userId } = res.locals;

        const createdAlbum = await AlbumContentService.createAlbumContent({
            albumId,
            userId,
            imageFileKey,
            eventDate,
            content,
        });

        return res.status(201).json({ item: createdAlbum });
    };

    static getAlbumContent: ValidatedRequestHandler<
        AlbumContentSchema['getAlbumContent']
    > = async (req, res) => {
        const { albumId, albumContentId } = req.params;
        const { userId } = res.locals;

        const item = await AlbumContentService.getAlbumContent({
            albumId,
            albumContentId,
            userId,
        });

        return res.status(200).json({ item });
    };

    static getAlbumContentList: ValidatedRequestHandler<
        AlbumContentSchema['getAlbumContentList']
    > = async (req, res) => {
        const { albumId } = req.params;
        const { userId } = res.locals;

        const items = await AlbumContentService.getAlbumContentList({
            albumId,
            ownerId: userId,
        });

        return res.status(200).json({ items });
    };

    static deleteAlbumContent: ValidatedRequestHandler<
        AlbumContentSchema['deleteAlbumContent']
    > = async (req, res) => {
        const { albumId, albumContentId } = req.params;
        const { userId } = res.locals;

        const deleteResult = await AlbumContentService.deleteAlbumContent({
            userId,
            albumId,
            albumContentId,
        });

        // NOTE : 삭제된 컬렉션이 없다면 No Content (204) 반환
        return res.sendStatus(deleteResult ? 200 : 204);
    };

    static patchSwapContent: ValidatedRequestHandler<
        AlbumContentSchema['patchSwapContent']
    > = async (req, res) => {
        const { albumId } = req.params;
        const {
            swapContent: [firstContentId, secondContentId],
        } = req.body;

        const updateResult = await AlbumContentService.swapAlbumContentSequence(
            {
                albumId,
                firstContentId,
                secondContentId,
            },
        );

        // NOTE : 업데이트 된 컬렉션이 없다면 No Content (204) 반환
        return res.sendStatus(updateResult ? 200 : 204);
    };

    static patchUpdateContent: ValidatedRequestHandler<
        AlbumContentSchema['patchUpdateContent']
    > = async (req, res) => {
        const { albumId, albumContentId } = req.params;
        const { imageFileKey, eventDate, content } = req.body;
        const { userId } = res.locals;

        const isChanged = [imageFileKey, eventDate, content].some(Boolean);

        if (!isChanged) {
            return res.sendStatus(204);
        }

        const updateResult = await AlbumContentService.updateAlbumContent({
            userId,
            albumId,
            albumContentId,
            imageFileKey,
            eventDate,
            content,
        });

        // NOTE : 업데이트 된 컬렉션이 없다면 No Content (204) 반환
        return res.sendStatus(updateResult ? 200 : 204);
    };
}
