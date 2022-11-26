// import formatError from '../../errors/format.errorr';
import register_routes from './routes';
import Fastify from 'fastify'
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import path from 'path';

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

// load all routes
register_routes(fastify);


export default fastify;
