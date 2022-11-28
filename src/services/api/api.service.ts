import Fastify from 'fastify'
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';

import handleAndFormatError from '../../errors/format.error';
import registerRoutes from './routes';
import registerSchemas from './schemas/index';
import swaggerInfo from './schemas/swagger.info.schema';

// Fastify setup
const fastify = Fastify();

// Security
fastify.register(helmet);
fastify.register(cors);

// swagger documentation
fastify.register(swagger, swaggerInfo);
fastify.register(swaggerUI, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  }
});

// Handle errors globally
fastify.setErrorHandler(handleAndFormatError);

// Schemas
registerSchemas(fastify);

// load all routes
registerRoutes(fastify);


export default fastify;
