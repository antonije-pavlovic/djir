import userShemas from './user/schemas';
import postSchema from './post/models';

export default {
  components: {
    schemas: {
      ...userShemas,
      ...postSchema,

      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Error message',
            example: 'Not found',
          },
          internalCode: {
            type: 'string',
            description: 'Error internal code',
            example: 'Invalid parameters',
          },
        },
      },
    }
  }
}