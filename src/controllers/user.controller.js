import { logger } from '../middlewares/logger.js';
import { findUser, save } from '../services/user.service.js';

export async function createUser(req, res, next) {
    try {
        const user = await save(req.body);
        res.status(201).json(user);
        logger.info(`POST /user - ${JSON.stringify(user)}`);

    } catch (error) {
        next(error);
    }
}

export async function getUser(req, res, next) {
    try {
        const user = await findUser(req.params.id);
        res.status(200).json(user);
        logger.info(`GET /user - ${JSON.stringify(user)}`);

    } catch (error) {
        next(error);
    }
}

