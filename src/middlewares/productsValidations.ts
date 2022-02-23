import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import formatMessage from '../helpers/formatMessage';

const errorsCode = {
  'string.min': 422,
  'any.required': 400,
  'number.min': 422,
  'number.base': 422,
  'string.base': 422,
  notFound: 404,
};

const AMOUNT_MESSAGES = {
  'string.min': 'Amount must be longer than 2 characters',
};

const NAME_MESSAGES = {
  'string.min': 'Name must be longer than 2 characters',
};

const createProductValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { name, amount } = req.body;
  
  const { error } = Joi.object({
    name: Joi.string().min(2).not().empty()
      .required()
      .messages(NAME_MESSAGES),
    amount: Joi.string().min(2).not().empty()
      .required()
      .messages(AMOUNT_MESSAGES),
  }).validate({ name, amount });

  if (error) {
    const index: string = error.details[0].type;
    const code: number = errorsCode[index as keyof typeof errorsCode];
    const message = formatMessage(error.details[0].message);

    return res.status(code).json({ error: message });
  }

  next();
};

export {
  createProductValidation,
};

export default createProductValidation;