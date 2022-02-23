import express from 'express';

import userFields from './middlewares/userFields';
import * as usersControllers from './controllers/usersControllers';

const app = express();

app.use(express.json());

app.post('/users', userFields, usersControllers.createUser);

export default app;
