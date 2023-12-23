export type ReqParam = {
    createAlbum: {
        ownerId: string;
        name: string;
    };
    createInvitation: {
        albumId: string;
        dueDate?: Date;
    }
    deleteAlbum: {
        albumId: string;
    };
    deleteInvitation: {
        albumId: string;
    };
    modifyAlbum: {
        albumId: string;
        name: string;
    };
    getAlbum: {
        albumId: string;
        ownerId: string;
    };
    getAlbumList: {
        ownerId: string;
    };
};
