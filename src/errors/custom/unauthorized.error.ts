import { HTTP_ERROR_CODES } from '../http.error.codes';
import ApplicationError from './application.error';

export default class UnauthorizedError extends ApplicationError {

  constructor(fields?: object) {
    const errorObject = HTTP_ERROR_CODES.UNAUTHORIZED;

    if(fields) {
      Object.assign(errorObject, {
        fields,
      });
    }

    super(errorObject);
  }
}