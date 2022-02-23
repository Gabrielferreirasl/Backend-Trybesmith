import * as productsModels from '../models/productsModels';
import * as productsInterfaces from '../interfaces/productsInterfaces';

const createProduct = async ({ name, amount }: productsInterfaces.Product) => {
  const id = await productsModels.createProduct({ name, amount });

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