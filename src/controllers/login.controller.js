import { logger } from '../middlewares/logger.js';
import { loginAuthentication } from '../services/login.service.js';

export async function userLogin(req, res, next) {
    try {
        const { login, password } = req.body;
        console.log(login, password);
        const response = await loginAuthentication(login, password);
        res.status(200).json(response);
        logger.info(`POST /login - ${response}`);

    } catch (error) {
        next(error);
    }
}