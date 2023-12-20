import { Document, Schema } from 'mongoose';

import { mongooseUniqueIdPlugin } from '#/libs/mongoose/unique-id';

export interface AlbumContentType extends Document {
    /**
     * 앨범 컨텐츠 Id
     */
    id: string;
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
}

export const albumContentSchema = new Schema<AlbumContentType>({
    id: {
        type: String,
        unique: true,
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
    }
});

albumContentSchema.plugin(mongooseUniqueIdPlugin, 'album_content');
