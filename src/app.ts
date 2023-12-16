import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

import { DEV_CONFIG, PROD_CONFIG } from '#/constants/setup';
import { NotFoundError } from '#/errors/definedErrors';
import errorHandler from '#/errors/errorHandler';
import router from '#/routes';
import mongoConnection from '#/utils/connectMongoDB';
import { stream } from '#/utils/logger';

dotenv.config();

const isProd: boolean = process.env.NODE_ENV === 'production';
const CURRENT_CONFIG = isProd ? PROD_CONFIG : DEV_CONFIG;

if (!isProd) {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}

const initExpressApp = () => {
  const app = express();

  // Body Parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logging with Winston
  app.use(morgan('combined', { stream }));

  // CORS Setting
  app.use(
    cors({
      origin: true, // FIXME : 로컬 환경에서의 테스트를 위해 CORS 임시 해제
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }),
  );

  app.get('/', (_, res) => {
    res.status(200).send('Holiday Capsule Server has been Enabled.');
  });

  app.listen(CURRENT_CONFIG.port, () => {
    console.log(`Holiday Capsule Server is running on ${CURRENT_CONFIG.port}`);
  });

  // Security (배포 환경에서만 적용)
  if (isProd) {
    const cspDefaults = helmet.contentSecurityPolicy.getDefaultDirectives();
    delete cspDefaults['upgrade-insecure-requests'];

    app.use(
      helmet({
        contentSecurityPolicy: { directives: cspDefaults },
      }),
    );

    app.use(hpp());
    app.set('trust proxy', true);
  }

  //Router List
  app.use('/api/v1', router);

  // Unknown Router - 404 Error
  app.use((req, res, next) => {
    next(new NotFoundError('해당 페이지를 찾을 수 없습니다.'));
  });

  // Express Error Handler
  app.use(errorHandler);

  // hide web server information
  app.disable('x-powered-by');
};

// mongodb connection
mongoConnection().then(initExpressApp);
