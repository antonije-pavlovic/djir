import { FastifyInstance } from 'fastify'

// Import all routes
import AccountRoute from './account.routes';
import UserRoute from './user.routes';

export default function registerRoutes(fastify: FastifyInstance) {

  fastify.register(AccountRoute.registerRoutes, { prefix: '/v1'});
  fastify.register(UserRoute.registerRoutes, { prefix: '/v1'});
}
