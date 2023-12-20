export type ReqParam = {
    getAlbumContentList: {
        albumId: string;
        ownerId: string;
    }
    createAlbumContent: {
        albumId: string;
        ownerId: string;
        imageFileKey: string;
        eventDate: Date;
        content: string;
    }
    swapAlbumContentSequence: [string, string]
    removeAlbumContent: {
        ownerId: string;
        albumContentId: string;
    }
    updateAlbumContent: {
        ownerId: string;
        albumContentId: string;
        imageFileKey?: string;
        eventDate?: Date;
        content?: string;
    }
}