import { IError } from '../error.model';

export default class ApplicationError extends Error {
  public code: string;
  public status: number;
  public fields?: any;
  public message: string;

  constructor(error: IError) {
    super();

    Object.setPrototypeOf(this, ApplicationError.prototype);
    Error.captureStackTrace(this, this.constructor);

    this.code = error.code;
    this.message = error.message;

    if(error.fields) {
      this.fields = error.fields;
    }

    this.status = error.status || 500;
  }

}