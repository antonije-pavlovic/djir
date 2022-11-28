import { FastifyInstance } from 'fastify'

// Import all routes
import AccountRoute from './account.routes';

export default function registerRoutes(fastify: FastifyInstance) {

  fastify.register(AccountRoute.registerRoutes, { prefix: '/v1'});
}
