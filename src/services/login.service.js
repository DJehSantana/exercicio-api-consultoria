import { findUserByEmail } from './user.service.js';

export async function loginAuthentication(login, password) {
    const user = await findUserByEmail(login);
    console.log(user);
    if (user.password != password) {
        throw new Error('Invalid password or login');
    }
    const response = `Bem vindo ${user.user}`;
    return response;
}