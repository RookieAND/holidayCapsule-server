import { BadRequestError, ForbiddenError } from '#/errors/definedErrors';
import { albumModel } from '#/models/album';
import { albumContentModel } from '#/models/album-content';
import { albumMemberModel } from '#/models/album-member';
import { albumMemberEnum } from '#/models/album-member/schema';

import type { ReqParam } from './type';

export class AlbumService {
    /**
     * 새로운 앨범을 생성하는 함수 register
     */
    static async createAlbum({ ownerId, name }: ReqParam['createAlbum']) {
        const ownedAlbumAmount = await albumModel.countDocuments({
            ownerId,
        });

        if (ownedAlbumAmount > 3) {
            throw new ForbiddenError('앨범은 최대 3개까지 생성할 수 있습니다.');
        }

        const createdAlbum = await albumModel.create({ ownerId, name });
        await albumMemberModel.create({
            albumId: createdAlbum.id,
            userId: ownerId,
            role: albumMemberEnum.role.OWNER,
        });

        return createdAlbum;
    }

    static async deleteAlbum({ albumId }: ReqParam['deleteAlbum']) {
        const { deleted } = await albumModel.softDelete({ id: albumId });
        await albumMemberModel.softDelete({ albumId });
        await albumContentModel.softDelete({ albumId });

        return deleted > 0;
    }

    static async modifyAlbum({
        albumId,
        name,
    }: ReqParam['modifyAlbum']) {
        const updatedResult = await albumModel.updateOne(
            { id: albumId },
            { $set: { name } },
        );

        return updatedResult.modifiedCount > 0;
    }

    static async getAlbum({ albumId, ownerId }: ReqParam['getAlbum']) {
        const ownedAlbum = await albumModel.findOne({ id: albumId, ownerId });
        return ownedAlbum;
    }

    static async getAlbumList({ ownerId }: ReqParam['getAlbumList']) {
        const ownedAlbumList = await albumModel.find({ ownerId });
        return ownedAlbumList;
    }
}
