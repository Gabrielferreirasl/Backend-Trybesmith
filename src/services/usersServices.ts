import jwt from 'jsonwebtoken';
import * as usersModels from '../models/usersModels';
import * as usersInterfaces from '../interfaces/usersInterfaces';

const { JWT_SECRET = 'suaSenha' } = process.env;

const createUser = async ({ username, classe, level, password }: usersInterfaces.User) => {
  const id = await usersModels.createUser({ username, classe, level, password });

  const token = jwt.sign({ id, username }, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });

  return { response: { token }, code: 201 };
};

const login = async ({ username, password }: usersInterfaces.Login) => {
  const user = await usersModels.login({ username, password });

  if (!user) return { response: { error: 'Username or password invalid' }, code: 401 };

  const token = jwt.sign({ id: user.id, username }, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });

  return { response: { token }, code: 200 };
};

export {
  createUser,
  login,
};

export default createUser;