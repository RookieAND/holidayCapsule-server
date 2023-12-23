import { z } from 'zod';

export const albumSchema = {
    postCreateAlbum: z.object({
        body: z.object({
            name: z.string(),
        }),
    }),
    postCreateInvitation: z.object({
        params: z.object({
            albumId: z.string(),
        }),
        body: z.object({
            dueDate: z.coerce.date().optional(),
        }),
    }),
    deleteAlbum: z.object({
        params: z.object({
            albumId: z.string(),
        }),
    }),
    deleteInvitation: z.object({
        params: z.object({
            albumId: z.string(),
        }),
    }),
    getAlbum: z.object({
        params: z.object({
            albumId: z.string(),
        }),
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
    postCreateInvitation: z.infer<typeof albumSchema.postCreateInvitation>;
    deleteAlbum: z.infer<typeof albumSchema.deleteAlbum>;
    deleteInvitation: z.infer<typeof albumSchema.deleteInvitation>;
    getAlbum: z.infer<typeof albumSchema.getAlbum>;
    patchModifyAlbum: z.infer<typeof albumSchema.patchModifyAlbum>;
};
