import { BadRequestError, ForbiddenError } from '#/errors/definedErrors';
import { albumContentModel } from '#/models/album-content';

import type { ReqParam } from './type';

export class AlbumContentService {
    static async getAlbumContentList({
        albumId,
        ownerId,
    }: ReqParam['getAlbumContentList']) {
        const [items, total] = await Promise.all([
            albumContentModel
                .find({ albumId }, { _id: 0 })
                .then((contentList) =>
                    contentList.map(({ ownerId: contentOwnerId, ...rest }) => ({
                        ...rest,
                        isOwned: ownerId === contentOwnerId,
                    })),
                ),
            albumContentModel.countDocuments({ albumId }),
        ]);

        return { items, total };
    }

    static async getAlbumContent({
        albumId,
        albumContentId,
        userId,
    }: ReqParam['getAlbumContent']) {
        const albumContent = await albumContentModel.findOne({
            albumId,
            id: albumContentId,
        });

        if (!albumContent) {
            throw new BadRequestError('유효하지 않은 앨범 컨텐츠 ID 입니다.');
        }

        if (albumContent.ownerId !== userId) {
            throw new ForbiddenError(
                '해당 앨범 컨텐츠를 열람할 수 있는 권한이 없습니다.',
            );
        }

        return albumContent;
    }

    static async createAlbumContent({
        albumId,
        userId,
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
            ownerId: userId,
            imageFileKey,
            eventDate,
            content,
            sequence,
        });

        return createdContent;
    }

    static async swapAlbumContentSequence({
        albumId,
        firstContentId,
        secondContentId,
    }: ReqParam['swapAlbumContentSequence']) {
        const [firstContent, secondContent] = await Promise.all([
            albumContentModel.findOne(
                { albumId, id: firstContentId },
                { _id: 0, sequence: 1 },
            ),
            albumContentModel.findOne(
                { albumId, id: secondContentId },
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

    static async deleteAlbumContent({
        userId,
        albumId,
        albumContentId,
    }: ReqParam['deleteAlbumContent']) {
        const deletedContent = await albumContentModel.findOne({
            albumId,
            id: albumContentId,
        });

        if (!deletedContent) {
            throw new BadRequestError('존재하지 않는 앨범 컨텐츠 ID 입니다.');
        }

        if (userId !== deletedContent.ownerId) {
            throw new ForbiddenError(
                '본인 소유가 아닌 앨범 컨텐츠를 삭제할 수 없습니다.',
            );
        }

        const deleteResult = await albumContentModel.softDelete({
            albumId,
            ownerId: userId,
            id: albumContentId,
        });
        return deleteResult.deleted > 0;
    }

    static async updateAlbumContent({
        userId,
        albumContentId,
        imageFileKey,
        eventDate,
        content,
    }: ReqParam['updateAlbumContent']) {
        const result = await albumContentModel.updateOne(
            { id: albumContentId, ownerId: userId },
            { $set: { imageFileKey, eventDate, content } },
        );

        return result;
    }
}
