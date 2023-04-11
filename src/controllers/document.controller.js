import { logger } from "../middlewares/logger.js";
import { deleteById, getAll, getById, save, update } from "../services/document.service.js";

export async function createDocument(req, res, next) {
    try {
        const document = await save(req.body);
        res.status(201).json(document);
        logger.info(`POST /document - ${JSON.stringify(document)}`);

    } catch (error) {
        next(error);
    }
}

export async function findAllDocuments(req, res, next) {
    try {
        const response = await getAll();
        res.status(200).json(response);
        logger.info('GET /document - success');
    } catch (error) {
        next(error);
    }
}

export async function findDocumentById(req, res, next) {
    try {
        const response = await getById(req.params.id);
        res.status(200).json(response);
        logger.info(`GET /docuemnt - ${JSON.stringify(response)}`);

    } catch (error) {
        next(error);
    }
}

export async function updateDocument(req, res, next) {
    try {
        const response = await update(req.params.id, req.body);
        res.status(200).json(response);
        logger.info(`PUT /document/:id - ${JSON.stringify(response)}`);

    } catch (error) {
        next(error);
    }
}

export async function deleteDocument(req, res, next) {
    try {
        await deleteById(req.params.id);
        res.status(204).json(null);
        logger.info(`DELETE /document/:id - success`);

    } catch (error) {
        next(error);
    }
}