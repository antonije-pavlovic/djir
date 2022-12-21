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

const conflictErrorSchema = {
  $id: 'ConflictError',
  type: 'object',
  required: ['code', 'message'],

  properties: {
    code: { type: 'string' },
    message: { type: 'string' }
  },

  example: {
    code: 'CONFLICT',
    message: 'The request could not be processed because of conflict in the request.'
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
const unauthorizedErrorSchema = {
  $id: 'UnauthorizedError',
  type: 'object',
  required: ['code', 'message'],

  properties: {
    code: { type: 'string' },
    message: { type: 'string' }
  },

  example: {
    code: 'UNAUTHORIZED',
    message: 'The client request has not been completed\
    because it lacks valid authentication credentials for the requested resource.'
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

export default [
  serverErrorSchema,
  unprocessableError,
  notFoundErrorSchema,
  conflictErrorSchema,
  unauthorizedErrorSchema
]