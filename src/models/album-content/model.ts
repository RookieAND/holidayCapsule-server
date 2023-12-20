import { type Document, model } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { type BaseMethodModel } from '#/libs/mongoose/base-method';

import { type AlbumContentType, albumContentSchema } from './schema';

type PluginModel<T extends Document> = BaseMethodModel<T> & SoftDeleteModel<T>;

export const albumModel = model<AlbumContentType, PluginModel<AlbumContentType>>(
    'album_content',
    albumContentSchema,
);
