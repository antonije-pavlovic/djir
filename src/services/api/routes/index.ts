import { FastifyInstance } from 'fastify'

// Import all routes
import UserRoute from './user.routes';
import AuthenticationRoutes from './authentication.routes';
import PostRoutes from './post.routes';

export default function registerRoutes(fastify: FastifyInstance) {

  fastify.register(UserRoute.registerRoutes, { prefix: '/v1/user'});
  fastify.register(AuthenticationRoutes.registerRoutes, { prefix: '/v1'});
  fastify.register(PostRoutes.registerRoutes, { prefix: '/v1/post'});
}
