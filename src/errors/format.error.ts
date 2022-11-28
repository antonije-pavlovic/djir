import { FastifyReply, FastifyRequest } from 'fastify';
import { IError } from './error.model';
import { HTTP_ERROR_CODES } from './http.error.codes';

export default function handleAndFormatError(error: any | IError, _request: FastifyRequest, reply: FastifyReply) {
  let data: IError;

  if(error.validation) {
    data = handleValidationError(error)
  } else if(!('code' in error)) {
    data = {
      code: HTTP_ERROR_CODES.SERVER_ERROR.code,
      status: HTTP_ERROR_CODES.SERVER_ERROR.status,
      message: HTTP_ERROR_CODES.SERVER_ERROR.message
    }
  } else {
    data = {
      code: error.code,
      message: error.message,
      status: error.status
    };
  }


  if(error.fields) {
    data.fields = error.fields
  }

  if(error.data) {
    Object.keys(error.data).forEach((key =>  data[key] = error.data[key]));
  }

  return reply.status(data.status).send(data);
}

function handleValidationError(error) {
  const fields: any = [];
  const errors = error.validation;

  for(let i = 0; i < errors.length; i++) {
    fields.push({
      path: errors[i].instancePath,
      message: errors[i].message
    })

  }

  return {
    code: HTTP_ERROR_CODES.UNPROCESSABLE.code,
    status: HTTP_ERROR_CODES.UNPROCESSABLE.status,
    message: HTTP_ERROR_CODES.UNPROCESSABLE.message,
    fields
  }
}