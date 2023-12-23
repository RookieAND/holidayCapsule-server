import { type Document, model } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { type BaseMethodModel } from '#/libs/mongoose/base-method';

import { type AlbumMemberType, albumMemberSchema } from './schema';

type PluginModel<T extends Document> = BaseMethodModel<T> & SoftDeleteModel<T>;

export const albumMemberModel = model<
    AlbumMemberType,
    PluginModel<AlbumMemberType>
>('album_member', albumMemberSchema);
