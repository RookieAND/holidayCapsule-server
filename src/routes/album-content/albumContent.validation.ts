import { z } from 'zod';

export const albumContentSchema = {
    postCreateAlbumContent: z.object({
        params: z.object({
            albumId: z.string(),
        }),
        body: z.object({
            imageFileKey: z.string(),
            eventDate: z.coerce.date(),
            content: z.string().max(50),
        }),
    }),
    deleteAlbumContent: z.object({
        params: z.object({
            albumId: z.string(),
            albumContentId: z.string(),
        }),
    }),
    getAlbumContentList: z.object({
        params: z.object({
            albumId: z.string(),
        }),
    }),
    getAlbumContent: z.object({
        params: z.object({
            albumId: z.string(),
            albumContentId: z.string(),
        }),
    }),
    patchSwapContent: z.object({
        params: z.object({
            albumId: z.string(),
        }),
        body: z.object({
            swapContent: z.tuple([z.string(), z.string()]),
        })
    }),
    patchUpdateContent: z.object({
        params: z.object({
            albumId: z.string(),
            albumContentId: z.string(),
        }),
        body: z.object({
            imageFileKey: z.string().optional(),
            eventDate: z.coerce.date().optional(),
            content: z.string().max(50).optional(),
        }),
    })
};

export type AlbumContentSchema = {
    postCreateAlbumContent: z.infer<
        typeof albumContentSchema.postCreateAlbumContent
    >;
    deleteAlbumContent: z.infer<typeof albumContentSchema.deleteAlbumContent>;
    getAlbumContentList: z.infer<typeof albumContentSchema.getAlbumContentList>;
    getAlbumContent: z.infer<typeof albumContentSchema.getAlbumContent>;
    patchSwapContent: z.infer<typeof albumContentSchema.patchSwapContent>;
    patchUpdateContent: z.infer<typeof albumContentSchema.patchUpdateContent>;
};
