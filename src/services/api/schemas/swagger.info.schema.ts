import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';

const swaggerInfo: FastifyDynamicSwaggerOptions = {
  openapi: {
    info: {
      title: 'Djir motorcyclist app',
      description: 'Everything you need',
      version: '0.0.1',
      contact: {
        name: 'John Doe',
        email: 'email@email.com',
        url: 'web.com'
      }
    },
    servers: [
      {
        url: '{protocol}://{host}:{port}/{basePath}/{apiVersion}',
        description: 'Local server',
        variables: {
          port: {
            enum: [
              '3000',
              '4000'
            ],
            default: '3000'
          },
          basePath: {
            enum: [
              'api'
            ],
            default: 'api'
          },
          apiVersion: {
            enum: [
              'v1',
              'v2'
            ],
            default: 'v1'
          },
          host: {
            enum: [
              '127.0.0.1',
              'localhost'
            ],
            default: 'localhost'
          },
          protocol: {
            enum: [
              'http',
              'https'
            ],
            default: 'http'
          }
        }
      },
    ],
    tags: [
      { name: 'Account', description: 'Account related end-points' },
    ]
  }
}


export default swaggerInfo;