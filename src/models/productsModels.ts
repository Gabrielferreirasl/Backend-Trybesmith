import { ResultSetHeader } from 'mysql2';
import * as productsInterfaces from '../interfaces/productsInterfaces';
import connection from './connection';

const createProduct = async ({ name, amount, userId }: productsInterfaces.UserProduct) => {
  const [{ insertId: idFromOrder }] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
    [userId],
  );

  await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Products (name, amount, orderId) VALUES (?, ?, ?)',
    [name, amount, idFromOrder],
  );

  return idFromOrder;
};

export {
  createProduct,
};

export default createProduct;