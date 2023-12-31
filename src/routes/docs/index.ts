import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const docsRouter = express.Router();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'holidayCapsule-Server',
            version: '1.0.0',
            description: 'REST API with Express',
            license: {
                name: 'GSC',
                url: 'https://choosealicense.com/licenses/mit/',
            },
        },
        servers: [
            {
                url: 'https://holiday-capsule-server.dev.goorm.io:4000',
                description: '배포 서버',
            },
        ],
    },
    apis: ['./src/docs/routes/*', './src/docs/components/*'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
docsRouter.use('/', swaggerUi.serve);
docsRouter.get('/', swaggerUi.setup(swaggerSpec, { explorer: true }));

export default docsRouter;
