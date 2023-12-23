import type { Document, Model } from 'mongoose';
import { Schema } from 'mongoose';

import { mongooseUniqueIdPlugin } from '#/libs/mongoose/unique-id';

export interface AlbumContentType extends Document {
    /**
     * 앨범 컨텐츠 Id
     */
    id: string;
    /**
     * 컨텐츠가 소속된 Album Id
     */
    albumId: string;
    /**
     * 컨텐츠를 작성한 유저 Id
     */
    ownerId: string;
    /**
     * 업로드한 이미지의 file Key
     */
    imageFileKey: string;
    /**
     * 기입된 컨텐츠 일자
     */
    eventDate: Date;
    /**
     * 부가 설명
     */
    content: string;
    /**
     * 컨텐츠 순서
     */
    sequence: number;
}

export const albumContentSchema = new Schema<
    AlbumContentType,
    Model<AlbumContentType>
>({
    id: {
        type: String,
        unique: true,
    },
    albumId: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        required: true,
    },
    imageFileKey: {
        type: String,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    sequence: {
        type: Number,
        required: true,
    },
});

albumContentSchema.index({ albumId: 1, ownerId: 1 });
albumContentSchema.plugin(mongooseUniqueIdPlugin, 'album_content');
