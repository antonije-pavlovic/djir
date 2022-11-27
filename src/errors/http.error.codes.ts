export const HTTP_ERROR_CODES = {
  UNPROCESSABLE: {
    code: 'UNPROCESSABLE',
    status: 422,
    message: 'The request is well-formed and in a supported format, but can not be processed.'
  },
  CONFLICT: {
    code: 'CONFLICT',
    status: 409,
    message: 'The request could not be processed because of conflict in the request.'
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    status: 404,
    message: 'The server can not find the requested resource.'
  },
  SERVER_ERROR: {
    code: 'SERVER_ERROR',
    status: 500,
    message: 'Internal server error.'
  }
};