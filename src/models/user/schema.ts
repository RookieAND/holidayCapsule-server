import { Schema, Document } from 'mongoose';

import { mongooseUniqueIdPlugin } from '#/libs/mongoose/unique-id';

export interface UserType extends Document {
    /**
     * 유저 ID
     */
    id: string;
    /**
     * 소셜 플랫폼으로부터 발급 받은 고유 Id
     */
    socialId: string;
    /**
     * 닉네임
     */
    nickname: string;
    /**
     * 프로필 Url
     */
    profileImageUrl: string;
}

export const userSchema = new Schema<UserType>({
    id: {
        type: String,
        unique: true,
    },
    socialId: {
        type: String,
        required: true,
    },
    nickname: { type: String },
    profileImageUrl: { type: String },
});

userSchema.plugin(mongooseUniqueIdPlugin, 'user');
