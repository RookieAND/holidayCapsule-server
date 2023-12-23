export type ReqParam = {
    createAlbum: {
        ownerId: string;
        name: string;
    };
    deleteAlbum: {
        ownerId: string;
        albumId: string;
    };
    modifyAlbum: {
        ownerId: string;
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
