const serverErrorSchema = {
  $id: 'ServerError',
  type: 'object',
  required: ['code', 'message'],

  properties: {
    code: { type: 'string' },
    message: { type: 'string' }
  },

  example: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error'
  }
}

const notFoundErrorSchema = {
  $id: 'NotFoundError',
  type: 'object',
  required: ['code', 'message'],

  properties: {
    code: { type: 'string' },
    message: { type: 'string' }
  },

  example: {
    code: 'NOT_FOUND',
    message: 'The server can not find the requested resource.'
  }
}

const unprocessableError = {
  $id: 'UnprocessableError',
  type: 'object',
  required: ['code', 'message', 'fields'],

  properties: {
    code: { type: 'string' },
    message: { type: 'string' },
    fields: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          path: { type: 'string' },
          message: { type: 'string' }
        }
      }
    }
  }
}

export default [
  serverErrorSchema,
  unprocessableError,
  notFoundErrorSchema
]