import AccountEndpoint from '../../account/account.endpoint';
import { FastifyInstance, DoneFuncWithErrOrRes, FastifyPluginOptions } from 'fastify'


export default class AccountRoute {

  public static registerRoutes(fastify: FastifyInstance, _opts: FastifyPluginOptions, done: DoneFuncWithErrOrRes) {
    const accountEndpoint = new AccountEndpoint();

    fastify.post('/account', {
      schema: {
        description: 'Account endpoint',
        tags: ['Account'],
        body: { $ref: 'AccountCreate' },
        response: {
          200: {
            description: 'Account data transfer object',
            $ref: 'AccountDTO'
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
      },
      handler: accountEndpoint.create
    },
    );

    fastify.get('/account/:id', {
      schema: {
        description: 'Get user by ID',
        tags: ['Account'],
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
            description: 'Account data transfer object',
            $ref: 'AccountDTO'
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
    accountEndpoint.getById
    );

    fastify.delete('/account/:id', {
      schema: {
        description: 'Delete account by ID',
        tags: ['Account'],
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
            description: 'Account is deleted successfully',
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
    accountEndpoint.deleteById
    );

    fastify.put('/account/:id', {
      schema: {
        description: 'Update account by ID',
        tags: ['Account'],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            }
          }
        },
        body: { $ref: 'AccountUpdate' },
        response: {
          200: {
            description: 'Account is deleted successfully',
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
    accountEndpoint.updateById
    );

    done();
  }
}
