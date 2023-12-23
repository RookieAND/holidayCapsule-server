import { Document, Schema } from 'mongoose';
import { customAlphabet } from 'nanoid';

export interface AlbumInvitationType extends Document {
    /**
     * 초대를 보낸 앨범 Id
     */
    albumId: string;
    /**
     * 앨범 초대 수락에 필요한 Pin Number
     */
    invitationCode: string;
    /**
     * 만료 기한
     */
    dueDate: Date;
}

export const albumInvitationSchema = new Schema<AlbumInvitationType>({
    albumId: {
        type: String,
        unique: true,
    },
    invitationCode: {
        type: String,
        unique: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
});

// NOTE : 영어 대문자 + 숫자로 이루어진 PIN 을 Id로 발급
albumInvitationSchema.pre('save', function (next) {
    const generatedCode = customAlphabet(
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        6,
    )();
    this.invitationCode = generatedCode;
    next();
});
