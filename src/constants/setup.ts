import dotenv from 'dotenv';

dotenv.config();

export const DEV_CONFIG = {
  mode: 'dev',
  port: '4000',
  baseURL: 'http://localhost:4000',
  mongoose: {
    uri: process.env.DEV_MONGO_URI || '',
  },
} as const;

export const PROD_CONFIG = {
  mode: 'prod',
  port: '4000',
  baseURL: 'https://holiday-capsule-server.dev.goorm.io:4000',
  mongoose: {
    uri: process.env.PROD_MONGO_URI || '',
  },
} as const;