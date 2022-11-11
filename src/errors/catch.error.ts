import { Request, Response, NextFunction } from 'express';

export default function catchErrors(handler) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      return handler(req, res);
    } catch(error) {
      return next(error);
    }
  };
}