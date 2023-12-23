import { ResourceConflictError } from '#/errors/definedErrors';
import { albumMemberModel } from '#/models/album-member';
import { albumContentModel } from '#/models/album-content';
import { albumMemberEnum } from '#/models/album-member/schema';

import type { ReqParam } from './type';

export class AlbumMemberService {
    static async createAlbumMember({
        albumId,
        userId,
    }: ReqParam['createAlbumMember']) {
        const isAlreadyExist = await albumMemberModel.exists({
            albumId,
            userId,
        });

        if (isAlreadyExist) {
            throw new ResourceConflictError('이미 앨범에 참여한 사용자입니다.');
        }

        const createdMember = await albumMemberModel.create({
            albumId,
            userId,
            role: albumMemberEnum.role.MEMBER,
        });

        return createdMember;
    }

    static async deleteAlbumMember({
        albumId,
        userId,
    }: ReqParam['deleteAlbumMember']) {
        const deleteResult = await albumMemberModel.softDelete({
            albumId,
            userId,
        });
        await albumContentModel.softDelete({ albumId, userId });

        return deleteResult.deleted > 0;
    }

    static async getAlbumMemberList({
        albumId,
    }: ReqParam['getAlbumMemberList']) {

        const [memberList, total] = await Promise.all([
            albumMemberModel.find(
                { albumId },
                { _id: 0, __v: 0 },
            ),
            albumMemberModel.countDocuments({ albumId })
        ])

        return { items: memberList, total };
    }
}
