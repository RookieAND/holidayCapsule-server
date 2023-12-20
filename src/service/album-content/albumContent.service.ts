import { BadRequestError, ForbiddenError } from '#/errors/definedErrors';
import { albumContentModel } from '#/models/album-content';

import type { ReqParam } from './type';

export class AlbumContentService {
    static async getAlbumContentList({
        albumId,
        ownerId,
    }: ReqParam['getAlbumContentList']) {
        const albumContentList = await albumContentModel
            .find({ albumId }, { _id: 0 })
            .then((contentList) =>
                contentList.map(({ ownerId: contentOwnerId, ...rest }) => ({
                    ...rest,
                    isOwned: ownerId === contentOwnerId,
                })),
            );

        return albumContentList;
    }

    static async createAlbumContent({
        albumId,
        ownerId,
        imageFileKey,
        eventDate,
        content,
    }: ReqParam['createAlbumContent']) {
        const prevContent = await albumContentModel.findOne(
            { albumId },
            { _id: 0, sequence: 1 },
            { sort: { sequence: -1 } },
        );

        const sequence = prevContent ? prevContent.sequence + 1 : 0;

        const createdContent = await albumContentModel.create({
            albumId,
            ownerId,
            imageFileKey,
            eventDate,
            content,
            sequence,
        });

        return createdContent;
    }

    static async swapAlbumContentSequence([
        firstContentId,
        secondContentId,
    ]: ReqParam['swapAlbumContentSequence']) {
        const [firstContent, secondContent] = await Promise.all([
            albumContentModel.findOne(
                { id: firstContentId },
                { _id: 0, sequence: 1 },
            ),
            albumContentModel.findOne(
                { id: secondContentId },
                { _id: 0, sequence: 1 },
            ),
        ]);

        if (!firstContent || !secondContent) {
            throw new BadRequestError('존재하지 않는 앨범 컨텐츠 ID 입니다.');
        }

        await Promise.all([
            albumContentModel.updateOne(
                { id: firstContentId },
                { $set: { sequence: secondContent.sequence } },
            ),
            albumContentModel.updateOne(
                { id: secondContent },
                { $set: { sequence: firstContent.sequence } },
            ),
        ]);

        return true;
    }

    static async removeAlbumContent({
        ownerId,
        albumContentId,
    }: ReqParam['removeAlbumContent']) {
        const result = await albumContentModel.softDelete({
            id: albumContentId,
            ownerId,
        });
        return result;
    }

    static async updateAlbumContent({
        ownerId,
        albumContentId,
        imageFileKey,
        eventDate,
        content,
    }: ReqParam['updateAlbumContent']) {
        const result = await albumContentModel.updateOne(
            { id: albumContentId, ownerId },
            { $set: { imageFileKey, eventDate, content } },
        );

        return result;
    }
}
