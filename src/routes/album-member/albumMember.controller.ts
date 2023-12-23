import { AlbumMemberService } from '#/service/album-member';
import { ValidatedRequestHandler } from '#/types/validation';

import type { AlbumMemberSchema } from './albumMember.validation';

export class AlbumMemberController {
    static postInviteAlbumMember: ValidatedRequestHandler<
        AlbumMemberSchema['postInviteAlbumMember']
    > = async (req, res) => {
        const { albumId, invitationCode } = req.params;
        const { userId } = res.locals;

        const createdAlbum = await AlbumMemberService.createAlbumMember({
            albumId,
            invitationCode,
            userId,
        });

        return res.status(201).json({ item: createdAlbum });
    };

    static getAlbumMemberList: ValidatedRequestHandler<
        AlbumMemberSchema['getAlbumMemberList']
    > = async (req, res) => {
        const { albumId } = req.params;

        const { items, total } = await AlbumMemberService.getAlbumMemberList({
            albumId,
        });

        return res.status(200).json({ items, total });
    };

    static deleteAlbumMember: ValidatedRequestHandler<
        AlbumMemberSchema['deleteAlbumMember']
    > = async (req, res) => {
        const { albumId } = req.params;
        const { userId } = res.locals;

        const deleteResult = await AlbumMemberService.deleteAlbumMember({
            albumId,
            userId,
        });

        // NOTE : 삭제된 컬렉션이 없다면 No Content (204) 반환
        return res.sendStatus(deleteResult ? 200 : 204);
    };
}
