import { BadRequestError, ForbiddenError } from '#/errors/definedErrors';
import { albumModel } from '#/models/album';

import type { AlbumServiceReqParam } from './type';

export class AlbumService {
    /**
     * 새로운 앨범을 생성하는 함수 register
     */
    static async createAlbum({
        ownerId,
        name,
    }: AlbumServiceReqParam['createAlbum']) {
        const ownedAlbumAmount = await albumModel.countDocuments({
            ownerId,
        });

        if (ownedAlbumAmount > 3) {
            throw new ForbiddenError('앨범은 최대 3개까지 생성할 수 있습니다.');
        }

        const createdAlbum = await albumModel.create({ ownerId, name });
        return createdAlbum;
    }

    static async deleteAlbum({
        albumId,
        ownerId,
    }: AlbumServiceReqParam['deleteAlbum']) {
        const ownedAlbum = await albumModel.findOne({ id: albumId, ownerId });

        if (!ownedAlbum) {
            throw new BadRequestError('존재하지 않는 앨범입니다.');
        }

        const { deleted } = await albumModel.softDelete({ id: albumId });
        return !!deleted;
    }

    static async modifyAlbum({
        albumId,
        ownerId,
        name,
    }: AlbumServiceReqParam['modifyAlbum']) {
        const ownedAlbum = await albumModel.findOne({ id: albumId, ownerId });

        if (!ownedAlbum) {
            throw new BadRequestError('존재하지 않는 앨범입니다.');
        }

        const updatedResult = await albumModel.updateOne(
            { id: albumId },
            { $set: { name } },
        );

        return !!updatedResult.modifiedCount;
    }
}
