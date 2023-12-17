import { model } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { type UserType, userSchema } from './schema';

export const userModel = model<UserType, SoftDeleteModel<UserType>>(
    'meeting',
    userSchema,
);
