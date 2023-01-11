import { FastifyInstance, DoneFuncWithErrOrRes, FastifyPluginOptions } from 'fastify'
import PostEndpoint from '../../post/post.endpoint';

export default class PostRoutes {

  public static registerRoutes(fastify: FastifyInstance, _opts: FastifyPluginOptions, done: DoneFuncWithErrOrRes) {
    const postEndpoint = new PostEndpoint();


    fastify.post('/', {
      handler: postEndpoint.create
    }),

    done();
  }
}
