import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const errorsCode = {
  'any.required': 400,
  'array.base': 422,
  'array.min': 422,
  notFound: 404,
};

const ARRAY_MESSAGES = {
  'any.required': 'Products is required',
  'array.base': 'Products must be an array of numbers',
  'array.min': 'Products can\'t be empty',
};

const crateOrders = async (req: Request, res: Response, next: NextFunction) => {
  const { products } = req.body;
  
  const { error } = Joi.array().items(Joi.number()).min(1).required()
    .sparse(false)
    .messages(ARRAY_MESSAGES)
    .validate(products);
  
  if (error) {
    const index: string = error.details[0].type;
    
    const code: number = errorsCode[index as keyof typeof errorsCode];
    const { message } = error.details[0];
  
    return res.status(code).json({ error: message });
  }
  
  next();
};

export {
  crateOrders,
};
  
export default crateOrders;