import { findUserByEmail } from './user.service.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function loginAuthentication(login, password) {
    const user = await findUserByEmail(login);
    if (user.password != password) {
        throw new Error('Invalid password or login');
    }
    const token = jwt.sign({ id: user.id }, process.env.CHAVE_JWT);
    user.token = token;
    return (user);
}