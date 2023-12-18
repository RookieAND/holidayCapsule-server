import { Router } from 'express';

import docsRouter from './docs';
import { authRouter } from './auth';

const defaultRouter = Router();

const routerList = [
  {
    path: '/api-docs',
    router: docsRouter,
  },
  {
    path: '/auth',
    router: authRouter,
  }
];

routerList.forEach((route) => {
  defaultRouter.use(route.path, route.router);
});

export default defaultRouter;