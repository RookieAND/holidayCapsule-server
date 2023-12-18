export type AlbumServiceReqParam = {
    createAlbum: {
        ownerId: string;
        name: string;
    }
    deleteAlbum: {
        ownerId: string;
        albumId: string;
    }
    modifyAlbum: {
        ownerId: string;
        albumId: string;
        name: string;
    }
}