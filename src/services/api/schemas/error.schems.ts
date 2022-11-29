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
  unprocessableError
]