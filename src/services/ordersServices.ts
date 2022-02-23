import * as ordersModels from '../models/ordersModels';

const createOrders = async (products: number[], userId: number) => {
  await ordersModels.createOrders(products, userId);

  return { response: { order: { userId, products } }, code: 201 };
};

const getOrdersById = async (id: number) => {
  const errorResponse = { response: { error: 'Order not found' }, code: 404 };

  if (!id || typeof id !== 'number') {
    console.log(id);
    
    return errorResponse;
  }

  const orders = await ordersModels.getOrdersById(id);

  if (!orders) return errorResponse;

  return { response: orders, code: 200 };
};

const getOrders = async () => {
  const orders = await ordersModels.getOrders();

  return { response: orders, code: 200 };
};

export { 
  createOrders,
  getOrdersById,
  getOrders,
};

export default createOrders;