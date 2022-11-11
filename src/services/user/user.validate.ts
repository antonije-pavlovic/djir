import { body } from 'express-validator';
import validator from '../api/middlewares/validator';

export const validateUser = validator([
  body('name')
    .notEmpty()
    .isString()
    .withMessage('Name is required')
]);