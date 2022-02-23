import { ResultSetHeader } from 'mysql2';
import Order from '../interfaces/ordersInterfaces';
import { UserProduct } from '../interfaces/productsInterfaces';
import connection from './connection';

const createOrders = async (products: number[], userId: number) => {
  const [{ insertId: idFromOrder }] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
    [userId],
  );

  await Promise.all(products.map((id) => connection.execute<ResultSetHeader>(
    `UPDATE Trybesmith.Products SET orderId = ? 
    WHERE id = ?`,
    [idFromOrder, id],
  )));
};

const getOrdersById = async (id: number) => {
  const [rows] = await connection.execute(
    'SELECT * FROM Trybesmith.Orders WHERE id = ?',
    [id],
  );
  
  const [order] = rows as Order[];
  
  if (!order) return null;

  const [productsRows] = await connection.execute(
    'SELECT * FROM Trybesmith.Products WHERE orderId = ?',
    [id],
  );

  const arrIds = productsRows as UserProduct[];

  const products = arrIds.map(({ id: productId }) => productId);

  return { ...order, products };
};

export {
  createOrders,
  getOrdersById,
};

export default createOrders;