import { Router } from 'express';
import { userLogin } from '../controllers/login.controller.js';

const loginRouter = Router();

loginRouter.post('/', userLogin);

export { loginRouter }