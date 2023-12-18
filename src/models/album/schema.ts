import { Document, Schema } from 'mongoose';

import { mongooseUniqueIdPlugin } from '#/libs/mongoose/unique-id';

export interface AlbumType extends Document {
    /**
     * 앨범 Id
     */
    id: string;
    /**
     * 앨범 소유주 Id
     */
    ownerId: string;
    /**
     * 앨범 이름
     */
    name: string;
}

export const albumSchema = new Schema<AlbumType>({
    id: {
        type: String,
        unique: true,
    },
    ownerId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

albumSchema.plugin(mongooseUniqueIdPlugin, 'album');
