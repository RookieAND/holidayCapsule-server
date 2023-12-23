import { Router } from 'express';

import { albumRouter } from './album';
import { albumContentRouter } from './album-content';
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
    {
        path: '/album-content',
        router: albumContentRouter,
    },
];

routerList.forEach((route) => {
    defaultRouter.use(route.path, route.router);
});

export default defaultRouter;
