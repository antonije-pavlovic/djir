import { FastifyInstance } from 'fastify'

// Import all routes
import AccountRoute from './account';

export default function register_routes(fastify: FastifyInstance) {

  fastify.register(AccountRoute.registerRoutes, { prefix: '/v1'});
}
