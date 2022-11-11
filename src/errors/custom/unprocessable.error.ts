import { HTTP_ERROR_CODES } from '../http.error.codes';
import ApplicationError from './application.error';

export default class UnprocessableError extends ApplicationError {

  constructor(fields?) {
    const errorObject = HTTP_ERROR_CODES.UNPROCESSABLE;

    if(fields) {
      Object.assign(errorObject, {
        fields,
      });
    }

    super(errorObject);
  }
}