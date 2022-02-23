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

export {
  createUser,
};

export default createUser;