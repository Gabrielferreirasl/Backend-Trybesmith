interface Product {
  id?: number,
  name: string,
  amount: string,
}

interface UserProduct extends Product {
  userId: number,
}

export {
  Product,
  UserProduct,
};

export default Product;