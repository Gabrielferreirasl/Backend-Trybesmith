import { Request, Response } from 'express';
import * as ordersServices from '../services/ordersServices';

const createOrders = async (req: Request, res: Response) => {
  const { products, userId } = req.body;
  
  const { response, code } = await ordersServices.createOrders(products, userId);
  
  res.status(code).json(response);
};

const getOrdersById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { response, code } = await ordersServices.getOrdersById(+id);
  
  res.status(code).json(response);
};

const getOrders = async (_req: Request, res: Response) => {
  const { response, code } = await ordersServices.getOrders();
  
  res.status(code).json(response);
};

export {
  createOrders,
  getOrdersById,
  getOrders,
};
  
export default createOrders;