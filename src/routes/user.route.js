import { Router } from 'express';
import { createUser, getUser } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/:id', getUser);

export { userRouter }