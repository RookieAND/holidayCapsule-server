import { Router } from 'express';

import docsRouter from './docs';

const defaultRouter = Router();

const routerList = [
  {
    path: '/api-docs',
    router: docsRouter,
  },
];

routerList.forEach((route) => {
  defaultRouter.use(route.path, route.router);
});

export default defaultRouter;