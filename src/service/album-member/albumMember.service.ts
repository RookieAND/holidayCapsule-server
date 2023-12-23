import dayjs from 'dayjs';
import tz from 'dayjs/plugin/timezone';

import { BadRequestError, ResourceConflictError } from '#/errors/definedErrors';
import { albumContentModel } from '#/models/album-content';
import { albumInvitationModel } from '#/models/album-invitation';
import { albumMemberModel } from '#/models/album-member';
import { albumMemberEnum } from '#/models/album-member/schema';

import type { ReqParam } from './type';

dayjs.extend(tz);

export class AlbumMemberService {
    static async createAlbumMember({
        albumId,
        invitationCode,
        userId,
    }: ReqParam['createAlbumMember']) {
        const invitation = await albumInvitationModel.findOne({
            albumId,
            invitationCode,
        });

        if (!invitation || dayjs().tz().isAfter(invitation.dueDate)) {
            throw new BadRequestError('유효하지 않은 앨범 초대 코드입니다.');
        }

        const isAlreadyJoined = await albumMemberModel.exists({
            albumId,
            userId,
        });

        if (isAlreadyJoined) {
            throw new ResourceConflictError('이미 앨범에 참여한 사용자입니다.');
        }

        const joinedMembers = await albumMemberModel.countDocuments({
            albumId,
        });

        if (joinedMembers > 4) {
            throw new ResourceConflictError('하나의 앨범에는 최대 4명의 유저만 들어올 수 있습니다.');
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
            albumMemberModel.find({ albumId }, { _id: 0, __v: 0 }),
            albumMemberModel.countDocuments({ albumId }),
        ]);

        return { items: memberList, total };
    }
}
