import * as productsModels from '../models/productsModels';
import * as productsInterfaces from '../interfaces/productsInterfaces';

const createProduct = async ({ name, amount, userId }: productsInterfaces.UserProduct) => {
  const id = await productsModels.createProduct({ name, amount, userId });

  return { response: { item: { id, name, amount } }, code: 201 };
};

const getProducts = async () => {
  const products = await productsModels.getProducts();

  return { response: products, code: 200 };
};

export { 
  createProduct,
  getProducts,
};

export default createProduct;