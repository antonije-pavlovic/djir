import { FastifyInstance } from 'fastify'

// Import all routes
import UserRoute from './user.routes';
import AuthenticationRoutes from './authentication.routes';
import AuthorizationRoutes from './authorization.routes';

export default function registerRoutes(fastify: FastifyInstance) {

  fastify.register(UserRoute.registerRoutes, { prefix: '/v1'});
  fastify.register(AuthenticationRoutes.registerRoutes, { prefix: '/v1'});
  fastify.register(AuthorizationRoutes.registerRoutes, { prefix: '/v1'});
}
