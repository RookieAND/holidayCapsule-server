import { BadRequestError, ResourceConflictError } from '#/errors/definedErrors';
import { albumMemberModel } from '#/models/album-member';
import { albumMemberEnum } from '#/models/album-member/schema';
import { userModel } from '#/models/user';

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
        const isValidUser = await userModel.exists({
            id: userId,
        });

        if (!isValidUser) {
            throw new BadRequestError('존재하지 않는 사용자 ID 입니다.');
        }

        const isJoined = await albumMemberModel.exists({
            albumId,
            userId,
        });

        if (!isJoined) {
            throw new BadRequestError('앨범에 참여 중인 사용자가 아닙니다.');
        }

        const deleteResult = await albumMemberModel.softDelete({
            albumId,
            userId,
        });

        return deleteResult.deleted > 0;
    }

    static async getAlbumMemberList({
        albumId,
    }: ReqParam['getAlbumMemberList']) {
        const albumMemberList = await albumMemberModel.find(
            { albumId },
            { _id: 0, __v: 0 },
        );

        return albumMemberList;
    }
}
