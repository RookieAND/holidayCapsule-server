export type ReqParam = {
    createAlbum: {
        ownerId: string;
        name: string;
    };
    deleteAlbum: {
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
