export default {
  '/user': {
    get: {
      tags: ['User'],
      parameters: [{
        name: '_id',
        in: 'path',
        required: true,
        description: 'User ID',
        schema: {
          type: 'string',
        }
      }],
      responses: {
        200: {
          description: 'Get user by id',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserModel',
              },
            },
          },
        },
      },
    }
  }
}