import { z } from 'zod';

export const authSchema = {
    postLogin: z.object({
        body: z.object({
            id: z.number(),
            profileImageUrl: z.string(),
            nickname: z.string(),
        }),
    }),
};

export type AuthSchema = {
    postLogin: z.infer<typeof authSchema.postLogin>;
};
