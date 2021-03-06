import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import formatMessage from '../helpers/formatMessage';
import * as usersInterfaces from '../interfaces/usersInterfaces';

const errorsCode = {
  'string.min': 422,
  'any.required': 400,
  'number.min': 422,
  'number.base': 422,
  'string.base': 422,
  notFound: 404,
};

const USERNAME_MESSAGES = {
  'string.min': 'Username must be longer than 2 characters',
};

const CLASSE_MESSAGES = {
  'string.min': 'Classe must be longer than 2 characters',
};

const LEVEL_MESSAGES = {
  'number.min': 'Level must be greater than 0',
};

const PASSWORD_MESSAGES = {
  'string.min': 'Password must be longer than 7 characters',
};

const joiValidation = ({ username, classe, level, password }: usersInterfaces.User) => Joi.object({
  username: Joi.string().min(3).not().empty()
    .required()
    .messages(USERNAME_MESSAGES),
  classe: Joi.string().min(3).not().empty()
    .required()
    .messages(CLASSE_MESSAGES),
  password: Joi.string().min(8).not().empty()
    .required()
    .messages(PASSWORD_MESSAGES),
  level: Joi.number().strict().min(1).not()
    .empty()
    .required()
    .messages(LEVEL_MESSAGES),
}).validate({ username, classe, level, password });

const createUserValidation = (req: Request, res: Response, next: NextFunction) => {
  const { username, classe, level, password } = req.body;

  const { error } = joiValidation({ username, classe, level, password });

  if (error) {
    const index: string = error.details[0].type;
    const code: number = errorsCode[index as keyof typeof errorsCode];
    const message = formatMessage(error.details[0].message);

    return res.status(code).json({ error: message });
  }

  next();
};

const loginUserValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  
  const { error } = Joi.object({
    username: Joi.string().min(3).not().empty()
      .required()
      .messages(USERNAME_MESSAGES),
    password: Joi.string().min(8).not().empty()
      .required()
      .messages(PASSWORD_MESSAGES),
  }).validate({ username, password });

  if (error) {
    const index: string = error.details[0].type;
    const code: number = errorsCode[index as keyof typeof errorsCode];
    const message = formatMessage(error.details[0].message);

    return res.status(code).json({ error: message });
  }

  next();
};

export {
  createUserValidation,
  loginUserValidation,
};

export default createUserValidation;