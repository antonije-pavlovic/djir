import { NextFunction, Request, Response } from 'express';

export default function formatError(error: any, _req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(error);
  }

  const data = {
    code: error.code,
    message: error.message,
    fields: {}
  };

  if(error.fields) {
    data.fields = error.fields;
  }

  if(error.data) {
    Object.keys(error.data).forEach((key =>  data[key] = error.data[key]));
  }

  return res.status(error.status || 500).json(data);
}