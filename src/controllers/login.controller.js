import { logger } from '../middlewares/logger.js';
import { loginAuthentication } from '../services/login.service.js';

export async function userLogin(req, res, next) {
    try {
        const { login, password } = req.body;
        const user = await loginAuthentication(login, password);
        if (!user.token) {
            throw new Error('Invalid token');
        }
        res.status(200).json(`Bem vindo(a) ${user.user}!`);
        logger.info(`POST /login - user: ${user.login} - token: ${user.token}`);

    } catch (error) {
        next(error);
    }
}