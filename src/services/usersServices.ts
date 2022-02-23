import jwt from 'jsonwebtoken';
import * as usersModels from '../models/usersModels';
import * as usersInterfaces from '../interfaces/usersInterfaces';

const { JWT_SECRET = 'suaSenha' } = process.env;

const createUser = async ({ username, classe, level, password }: usersInterfaces.User) => {
  const id = await usersModels.createUser({ username, classe, level, password });

  const token = jwt.sign({ id, username, password }, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });

  return { response: { token }, code: 201 };
};

export {
  createUser,
};

export default createUser;