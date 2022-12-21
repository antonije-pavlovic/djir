import { FastifyInstance, DoneFuncWithErrOrRes, FastifyPluginOptions } from 'fastify'
import AuthenticationEndpoint from '../../authentication/authentication.endpoint';

export default class AuthenticationRoutes {

  public static registerRoutes(fastify: FastifyInstance, _opts: FastifyPluginOptions, done: DoneFuncWithErrOrRes) {
    const authenticationEndpoint = new AuthenticationEndpoint();

    fastify.post('/register', {
      schema: {
        description: 'Register endpoint',
        tags: ['Authentication'],
        body: { $ref: 'UserCreate' },
        response: {
          204: {},
          409: {
            description: 'User already exists',
            content: {
              'application/json': {
                schema: {
                  $ref: 'ConflictError'
                }
              }
            }
          },
          422: {
            description: 'Unprocesable entity',
            content: {
              'application/json': {
                schema: {
                  $ref: 'UnprocessableError'
                }
              }
            }
          },
          500: {
            description: 'Something went wrong.',
            $ref: 'ServerError'
          }
        },
      },
      handler: authenticationEndpoint.register
    },
    );

    fastify.post('/login', {
      schema: {
        description: 'Login endpoint',
        tags: ['Authentication'],
        body: { $ref: 'LoginCredentials' },
        response: {
          401: {
            description: 'Invalid credentials',
            content: {
              'application/json': {
                schema: {
                  $ref: 'UnauthorizedError'
                }
              }
            }
          },
          500: {
            description: 'Something went wrong.',
            $ref: 'ServerError'
          }
        },
      },
      handler: authenticationEndpoint.login
    }),
    done();
  }
}
