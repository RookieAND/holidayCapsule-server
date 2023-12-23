import { type Document, model } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { type BaseMethodModel } from '#/libs/mongoose/base-method';

import { type AlbumInvitationType, albumInvitationSchema } from './schema';

type PluginModel<T extends Document> = BaseMethodModel<T> & SoftDeleteModel<T>;

export const albumInvitationModel = model<AlbumInvitationType, PluginModel<AlbumInvitationType>>(
    'album_invitation',
    albumInvitationSchema,
);
