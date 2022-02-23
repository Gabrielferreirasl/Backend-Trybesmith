import * as ordersModels from '../models/ordersModels';
// import * as ordersInterfaces from '../interfaces/ordersInterfaces';

const createOrders = async (products: number[], userId: number) => {
  await ordersModels.createOrders(products, userId);

  return { response: { order: { userId, products } }, code: 201 };
};

export { 
  createOrders,
};

export default createOrders;