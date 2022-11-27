import path from 'path';

import Fastify from 'fastify'
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';

import format_error from '../../errors/format.error';
import register_routes from './routes';

// Fastify setup
const fastify = Fastify();

// Security
fastify.register(helmet);
fastify.register(cors);

// swagger documentation
const conf: any = {
  mode: 'static',
  specification: {
    path: path.resolve('./') + '/swagger.json'
  },
  exposeRoute: true
}

fastify.register(swagger, conf );
fastify.register(swaggerUI, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  }
});

// Handle errors globally
fastify.setErrorHandler((error, _request, reply) => {
  // Log error
  console.log(error)
  return format_error(error, reply);
});

// load all routes
register_routes(fastify);


export default fastify;
