import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationChain, ValidationError } from 'express-validator';
import UnprocessableError from '../../../errors/custom/unprocessable.error';

export default function validator(validatorsChain: ValidationChain[]) {

  return async(req: Request, _res: Response, next: NextFunction) => {
    const promiseArr: Array<Promise<any>> = [];

    for(let i = 0; i < validatorsChain.length; i++) {
      promiseArr.push(validatorsChain[i].run(req));
    }

    await Promise.all(promiseArr);

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const formatedErrors: Array<{path: string, code: string}> = [];
      const validatedErrors: ValidationError[] = errors.array();

      for(let i = 0; i < validatedErrors.length; i++) {
        formatedErrors.push({
          path: `${validatedErrors[i].location}.${validatedErrors[i].param}`,
          code: `${validatedErrors[i].msg.split(' ').join('_')}`
        });
      }

      return next(new UnprocessableError(formatedErrors));
    }

    return next();
  };
}