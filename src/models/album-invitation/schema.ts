import { Document, Schema } from 'mongoose';

export interface AlbumInvitationType extends Document {
    /**
     * 초대를 보낸 앨범 Id
     */
    albumId: string;
    /**
     * 앨범 초대 수락에 필요한 Pin Number
     */
    pinCode: string;
    /**
     * 만료 기한
     */
    dueDate: Date;
}

export const albumInvitationSchema = new Schema<AlbumInvitationType>({
    id: {
        type: String,
        unique: true,
    },
    pinCode: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
});
