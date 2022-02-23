import { ResultSetHeader } from 'mysql2';
import Order from '../interfaces/ordersInterfaces';
import { Product } from '../interfaces/productsInterfaces';
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

  const arrIds = productsRows as Product[];

  const products = arrIds.map(({ id: productId }) => productId);

  return { ...order, products };
};

const getOrders = async () => {
  const [orderRows] = await connection.execute(
    'SELECT * FROM Trybesmith.Orders',
  );

  const orders = orderRows as Order[];

  const idsProducts = await Promise.all(orders.map(({ id }) => connection.execute(
    'SELECT id FROM Trybesmith.Products WHERE orderId = ?',
    [id],
  )));

  const formatIdsProducts = idsProducts.map(([ids]) => {
    const [{ id }] = ids as Product[];
    return [id];
  });

  const response = orders.map((order, index) => ({ ...order, products: formatIdsProducts[index] }));

  return response;
};

export {
  createOrders,
  getOrdersById,
  getOrders,
};

export default createOrders;