import { z } from 'zod';

export const albumSchema = {
    postCreateAlbum: z.object({
        body: z.object({
            name: z.string(),
        }),
    }),
    deleteAlbum: z.object({
        params: z.object({
            albumId: z.string(),
        })
    }),
    patchModifyAlbum: z.object({
        params: z.object({
            albumId: z.string(),
        }),
        body: z.object({
            name: z.string(),
        }),
    }),
};

export type AlbumSchema = {
    postCreateAlbum: z.infer<typeof albumSchema.postCreateAlbum>;
    deleteAlbum: z.infer<typeof albumSchema.deleteAlbum>;
    patchModifyAlbum: z.infer<typeof albumSchema.patchModifyAlbum>;
};
