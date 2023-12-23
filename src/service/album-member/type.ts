export type ReqParam = {
    createAlbumMember: {
        albumId: string;
        invitationCode: string;
        userId: string;
    };
    deleteAlbumMember: {
        albumId: string;
        userId: string;
    };
    getAlbumMemberList: {
        albumId: string;
    };
};
