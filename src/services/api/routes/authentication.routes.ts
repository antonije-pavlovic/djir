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
          200: {
            description: 'Newly created user',
            content: {
              'application/json':{
                schema: {
                  $ref: 'UserDTO'
                },
                example:{
                  id: 5,
                  username: 'fast edi',
                  email: 'fast.edi@gmail.com',
                }
              }
            }
          },
          422: {
            description: 'Something went wrong.',
            content: {
              'application/json':{
                schema: {
                  $ref: 'UnprocessableError'
                },
                example: {
                  code: 'UNPROCESSABLE',
                  message: 'The request is well-formed and in a supported format, but can not be processed.',
                  fields: [
                    {
                      path: '/email',
                      messsage: 'Email is not in good format'
                    }
                  ]
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

    done();
  }
}
