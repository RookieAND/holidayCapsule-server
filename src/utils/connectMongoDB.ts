import mongoose from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

import { DEV_CONFIG, PROD_CONFIG } from '#/constants/setup';
import { logger } from '#/libs/logger/winstonLogger';
import { mongooseBaseMethodPlugin } from '#/libs/mongoose/base-method';
import { mongooseUniqueIdPlugin } from '#/libs/mongoose/unique-id';

const isProd = process.env.NODE_ENV === 'production';
const CURRENT_CONFIG = isProd ? PROD_CONFIG : DEV_CONFIG;

const mongoConnection = async () => {
  try {
    await mongoose.connect(CURRENT_CONFIG.mongoose.uri);
    mongoose.set('debug', true);

    /**
     * 모든 Schema 에 soft-delete-plugin 적용
     * @see https://github.com/nour-karoui/mongoose-soft-delete
     */
    mongoose.plugin(softDeletePlugin);

    mongoose.plugin(mongooseUniqueIdPlugin);
    mongoose.plugin(mongooseBaseMethodPlugin);

    console.log('Successfully connected to MongoDB');
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

export default mongoConnection;
