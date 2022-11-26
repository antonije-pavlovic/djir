export default {
  '/post': {
    get: {
      tags: ['Post'],
      parameters: [{
        name: '_id',
        in: 'path',
        required: true,
        description: 'post ID',
        schema: {
          type: 'string',
        }
      }],
      responses: {
        200: {
          description: 'Get post by id',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PostModel',
              },
            },
          },
        },
      },
    }
  }
}