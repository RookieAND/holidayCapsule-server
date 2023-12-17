import { model, type Document } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { type BaseMethodModel } from '#/libs/mongoose/base-method';
import { type UserType, userSchema } from './schema';

type PluginModel<T extends Document> = BaseMethodModel<T> & SoftDeleteModel<T>

type findOne = PluginModel<UserType>['findOne'];

export const userModel = model<UserType, PluginModel<UserType>>(
    'meeting',
    userSchema,
);
