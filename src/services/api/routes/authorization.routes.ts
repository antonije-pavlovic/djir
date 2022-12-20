import { FastifyInstance, DoneFuncWithErrOrRes, FastifyPluginOptions } from 'fastify'
import AuthorizationEndpoint from '../../authorization/authorization.endpoint';


export default class AuthorizationRoutes {

  public static registerRoutes(fastify: FastifyInstance, _opts: FastifyPluginOptions, done: DoneFuncWithErrOrRes) {
    const authorizationEndpoint = new AuthorizationEndpoint();

    fastify.get('/authorization/getTemplatePermissions', {
    },
    authorizationEndpoint.getTemplatePermssions
    );

    done();
  }
}
