import { type Document, model } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { type BaseMethodModel } from '#/libs/mongoose/base-method';

import { type AlbumType, albumSchema } from './schema';

type PluginModel<T extends Document> = BaseMethodModel<T> & SoftDeleteModel<T>;

export const albumModel = model<AlbumType, PluginModel<AlbumType>>(
    'album',
    albumSchema,
);
