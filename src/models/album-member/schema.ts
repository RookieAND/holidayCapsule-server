import type { Document, Model } from 'mongoose';
import { Schema } from 'mongoose';

import { mongooseUniqueIdPlugin } from '#/libs/mongoose/unique-id';

export const albumMemberEnum = {
    role: {
        MEMBER: 0,
        OWNER: 1,
    }
}

export interface AlbumMemberType extends Document {
    /**
     * 앨범 멤버 Id
     */
    id: string;
    /**
     * 소속된 Album Id
     */
    albumId: string;
    /**
     * 멤버로 참여한 유저 Id
     */
    userId: string;
    /**
     * 유저의 권한
     */
    role: number;
}

export const albumMemberSchema = new Schema<
    AlbumMemberType,
    Model<AlbumMemberType>
>({
    id: {
        type: String,
        unique: true,
    },
    albumId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true, 
    },
    role: {
        type: Number,
        enum: Object.values(albumMemberEnum.role),
        required: true,
    },
});

albumMemberSchema.index({ albumId: 1, userId: 1 });
albumMemberSchema.plugin(mongooseUniqueIdPlugin, 'album_member');
