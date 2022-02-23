import express from 'express';

import * as usersValidations from './middlewares/usersValidations';
import * as productsValidations from './middlewares/productsValidations';
import * as ordersValidations from './middlewares/ordersValidations';

import * as usersControllers from './controllers/usersControllers';
import * as productsControllers from './controllers/productsControllers';
import * as ordersControllers from './controllers/ordersControllers';

import tokenValidation from './middlewares/tokenValidation';

const app = express();

app.use(express.json());

app.post('/users', usersValidations.createUserValidation, usersControllers.createUser);
app.post('/login', usersValidations.loginUserValidation, usersControllers.login);

app.use(tokenValidation);

app.post(
  '/products', 
  productsValidations.createProductValidation,
  productsControllers.createProduct,
);
app.get('/products', productsControllers.getProducts);

app.post('/orders', ordersValidations.crateOrders, ordersControllers.createOrders);

export default app;
