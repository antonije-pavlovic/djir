import { FastifyInstance, DoneFuncWithErrOrRes, FastifyPluginOptions } from 'fastify'
import UserEndpoint from '../../user/user.endpoint';


export default class UserRoutes {

  public static registerRoutes(fastify: FastifyInstance, _opts: FastifyPluginOptions, done: DoneFuncWithErrOrRes) {
    const userEndpoint = new UserEndpoint();

    fastify.post('/user', {
      schema: {
        description: 'User endpoint',
        tags: ['User'],
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
      handler: userEndpoint.create
    },
    );

    fastify.get('/user/:id', {
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

    fastify.delete('/user/:id', {
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

    fastify.put('/user/:id', {
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
