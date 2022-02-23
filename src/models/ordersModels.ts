import { ResultSetHeader } from 'mysql2';
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

export {
  createOrders,
};

export default createOrders;