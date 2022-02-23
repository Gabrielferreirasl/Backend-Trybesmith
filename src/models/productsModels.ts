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

const getProducts = async () => {
  const [products] = await connection.execute(
    `SELECT a.id, name, amount, orderId FROM Trybesmith.Products AS a
     INNER JOIN Trybesmith.Orders AS b ON b.id = a.orderId`,
  );

  return products;
};

export {
  createProduct,
  getProducts,
};

export default createProduct;