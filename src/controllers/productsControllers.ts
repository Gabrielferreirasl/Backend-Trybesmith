import { Request, Response } from 'express';
import * as productsServices from '../services/productsServices';

const createProduct = async (req: Request, res: Response) => {
  const { name, amount, userId } = req.body;
  
  const { response, code } = await productsServices.createProduct({ name, amount, userId });
  
  res.status(code).json(response);
};

const getProducts = async (_req: Request, res: Response) => {
  const { response, code } = await productsServices.getProducts();

  res.status(code).json(response);
};

export {
  createProduct,
  getProducts,
};
  
export default createProduct;