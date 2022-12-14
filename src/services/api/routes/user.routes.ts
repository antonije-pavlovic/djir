import { FastifyInstance, DoneFuncWithErrOrRes, FastifyPluginOptions } from 'fastify'
import AuthenticationService from '../../authentication/authentication.service';
import UserEndpoint from '../../user/user.endpoint';


export default class UserRoutes {

  public static registerRoutes(fastify: FastifyInstance, _opts: FastifyPluginOptions, done: DoneFuncWithErrOrRes) {
    const userEndpoint = new UserEndpoint();
    const authenticationService = new AuthenticationService();

    fastify.get('/:id', {
      preHandler: [
        authenticationService.authorize
      ],
      schema: {
        description: 'Get user by ID',
        tags: ['User'],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            }
          }
        },
        response: {
          200: {
            description: 'User data transfer object',
            $ref: 'UserDTO'
          },
          404: {
            description: 'There is no user with specified id.',
            $ref: 'NotFoundError'
          },
          500: {
            description: 'Something went wrong.',
            $ref: 'ServerError'
          }
        },
      }
    },
    userEndpoint.getById
    );

    fastify.delete('/:id', {
      preHandler: [
        authenticationService.authorize
      ],
      schema: {
        description: 'Delete user by ID',
        tags: ['User'],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            }
          }
        },
        response: {
          200: {
            description: 'User is deleted successfully',
            properties: {
              success: {
                type: 'boolean'
              }
            }
          },
          500: {
            description: 'Something went wrong.',
            content: {
              'application/json':{
                schema: {
                  code: {
                    type: 'string'
                  },
                  message: {
                    type: 'string'
                  }
                },
                example: {
                  code: 'INTERNAL_SERVER_ERROR',
                  message: 'Internal server error'
                }
              }
            }
          }
        },
      }
    },
    userEndpoint.deleteById
    );

    fastify.put('/:id', {
      preHandler: [
        authenticationService.authorize
      ],
      schema: {
        description: 'Update user by ID',
        tags: ['User'],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            }
          }
        },
        body: { $ref: 'UserUpdate' },
        response: {
          200: {
            description: 'User is deleted successfully',
            properties: {
              success: {
                type: 'boolean'
              }
            }
          },
          500: {
            description: 'Something went wrong.',
            content: {
              'application/json':{
                schema: {
                  code: {
                    type: 'string'
                  },
                  message: {
                    type: 'string'
                  }
                },
                example: {
                  code: 'INTERNAL_SERVER_ERROR',
                  message: 'Internal server error'
                }
              }
            }
          }
        },
      }
    },
    userEndpoint.updateById
    );

    done();
  }
}
