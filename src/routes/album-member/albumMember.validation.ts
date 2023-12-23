import { z } from 'zod';

export const albumMemberSchema = {
    postInviteAlbumMember: z.object({
        params: z.object({
            albumId: z.string(),
        }),
    }),
    deleteAlbumMember: z.object({
        params: z.object({
            albumId: z.string(),
        }),
    }),
    getAlbumMemberList: z.object({
        params: z.object({
            albumId: z.string(),
        }),
    }),
};

export type AlbumMemberSchema = {
    postInviteAlbumMember: z.infer<
        typeof albumMemberSchema.postInviteAlbumMember
    >;
    deleteAlbumMember: z.infer<typeof albumMemberSchema.deleteAlbumMember>;
    getAlbumMemberList: z.infer<typeof albumMemberSchema.getAlbumMemberList>;
};
