import { FastifyReply } from 'fastify';
import { IError } from './error.model';
import { HTTP_ERROR_CODES } from './http.error.codes';

export default function format_error(error: any | IError, reply: FastifyReply) {
  let data: IError;

  if(!('code' in error)) {
    data = {
      code: HTTP_ERROR_CODES.SERVER_ERROR.code,
      status: HTTP_ERROR_CODES.SERVER_ERROR.status,
      message: HTTP_ERROR_CODES.SERVER_ERROR.message
    }
  } else {
    data = {
      code: error.code,
      message: error.message,
      fields: {},
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