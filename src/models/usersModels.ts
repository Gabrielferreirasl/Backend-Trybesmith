import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import * as usersInterfaces from '../interfaces/usersInterfaces';

const createUser = async ({ username, classe, level, password }: usersInterfaces.User) => {
  const [{ insertId }] = await connection.execute<ResultSetHeader>(
    `INSERT INTO Trybesmith.Users (username, classe, level, password)
        VALUES (?, ?, ?, ?)`,
    [username, classe, level, password],
  );

  return insertId;
};

const login = async ({ username, password }: usersInterfaces.Login)
: Promise<usersInterfaces.Login> => {
  const [rows] = await connection.execute(
    'SELECT * FROM Trybesmith.Users WHERE username=? AND password=?',
    [username, password],
  );

  const [user] = rows as usersInterfaces.Login[];

  return user;
};

export {
  createUser,
  login,
};

export default createUser;