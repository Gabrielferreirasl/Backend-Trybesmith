import { Request, Response } from 'express';
import * as usersServices from '../services/usersServices';

const createUser = async (req: Request, res: Response) => {
  const { username, classe, level, password } = req.body;

  const { response, code } = await usersServices.createUser({ username, classe, level, password });

  res.status(code).json(response);
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const { response, code } = await usersServices.login({ username, password });

  res.status(code).json(response);
};

export {
  createUser,
  login,
};

export default createUser;