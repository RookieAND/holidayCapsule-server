export type ReqParam = {
    getAlbumContentList: {
        albumId: string;
        ownerId: string;
    }
    getAlbumContent: {
        albumId: string;
        albumContentId: string;
        userId: string;
    }
    createAlbumContent: {
        albumId: string;
        userId: string;
        imageFileKey: string;
        eventDate: Date;
        content: string;
    }
    swapAlbumContentSequence: {
        albumId: string;
        firstContentId: string;
        secondContentId: string;
    }
    deleteAlbumContent: {
        userId: string;
        albumId: string;
        albumContentId: string;
    }
    updateAlbumContent: {
        userId: string;
        albumId: string;
        albumContentId: string;
        imageFileKey?: string;
        eventDate?: Date;
        content?: string;
    }
}