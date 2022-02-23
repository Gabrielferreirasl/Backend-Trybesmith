import express from 'express';

import * as usersValidations from './middlewares/userFields';
import * as usersControllers from './controllers/usersControllers';

const app = express();

app.use(express.json());

app.post('/users', usersValidations.createUserValidation, usersControllers.createUser);
app.post('/login', usersValidations.loginUserValidation, usersControllers.login);

export default app;
