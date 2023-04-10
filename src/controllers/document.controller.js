import { logger } from "../middlewares/logger.js";
import { saveDocument } from "../services/document.service.js";

export async function createDocument(req, res, next) {
    try {
        const document = await saveDocument(req.body);
        res.status(201).json(document);
        logger.info(`POST /document - ${JSON.stringify(document)}`);

    } catch (error) {
        next(error);
    }
}

export async function findAllDocuments(req, res, next) {
    try {

    } catch (error) {
        next(error);
    }
}

export async function findDocumentById(req, res, next) {
    try {

    } catch (error) {
        next(error);
    }
}

export async function updateDocument(req, res, next) {
    try {

    } catch (error) {
        next(error);
    }
}

export async function deleteDocument(req, res, next) {
    try {

    } catch (error) {
        next(error);
    }
}