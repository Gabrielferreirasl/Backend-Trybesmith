import { ResultSetHeader } from 'mysql2';
import * as productsInterfaces from '../interfaces/productsInterfaces';
import connection from './connection';

const createProduct = async ({ name, amount }: productsInterfaces.Product) => {
  const [{ insertId }] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Products (name, amount, orderId) VALUES (?, ?, ?)',
    [name, amount, null],
  );

  return insertId;
};

const getProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM Trybesmith.Products',
  );

  return products;
};

export {
  createProduct,
  getProducts,
};

export default createProduct;