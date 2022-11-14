export default {
  '/account': {
    get: {
      tags: ['Account'],
      parameters: [{
        name: '_id',
        in: 'path',
        required: true,
        description: 'Account ID',
        schema: {
          type: 'string',
        }
      }],
      responses: {
        200: {
          description: 'Get account by id',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AccountModel',
              },
            },
          },
        },
      },
    }
  }
}