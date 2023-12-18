import { Router } from 'express';

import { albumRouter } from './album';
import { authRouter } from './auth';
import docsRouter from './docs';

const defaultRouter = Router();

const routerList = [
    {
        path: '/api-docs',
        router: docsRouter,
    },
    {
        path: '/auth',
        router: authRouter,
    },
    {
        path: '/album',
        router: albumRouter,
    },
];

routerList.forEach((route) => {
    defaultRouter.use(route.path, route.router);
});

export default defaultRouter;
