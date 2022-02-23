import { Request, Response } from 'express';
import * as ordersServices from '../services/ordersServices';

const createOrders = async (req: Request, res: Response) => {
  const { products, userId } = req.body;
  
  const { response, code } = await ordersServices.createOrders(products, userId);
  
  res.status(code).json(response);
};

export {
  createOrders,
};
  
export default createOrders;