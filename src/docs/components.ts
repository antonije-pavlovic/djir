import accountSchema from './account/schemas';
import postSchema from './post/models';

export default {
  components: {
    schemas: {
      ...accountSchema,
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