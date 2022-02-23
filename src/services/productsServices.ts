import * as productsModels from '../models/productsModels';
import * as productsInterfaces from '../interfaces/productsInterfaces';

const createProduct = async ({ name, amount, userId }: productsInterfaces.UserProduct) => {
  const id = await productsModels.createProduct({ name, amount, userId });

  return { response: { item: { id, name, amount } }, code: 201 };
};

export { 
  createProduct,
};

export default createProduct;