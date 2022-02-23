import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as usersInterfaces from '../interfaces/usersInterfaces';

const { JWT_SECRET = 'suaSenha' } = process.env;

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
    
  if (!authorization) return res.status(401).json({ error: 'Token not found' });

  try {
    const user = jwt.verify(authorization, JWT_SECRET);
    const { id } = user as usersInterfaces.Login;
    req.body = { userId: id, ...req.body };

    next();
  } catch (_) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default tokenValidation;