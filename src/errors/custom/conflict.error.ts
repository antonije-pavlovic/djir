import { HTTP_ERROR_CODES } from '../http.error.codes';
import ApplicationError from './application.error';

export default class ConflictError extends ApplicationError {

  constructor(fields?: object) {
    const errorObject = HTTP_ERROR_CODES.CONFLICT;

    if(fields) {
      Object.assign(errorObject, {
        fields,
      });
    }

    super(errorObject);
  }
}