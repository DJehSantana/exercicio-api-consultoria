import { Router } from "express";
import {
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
} from "../repositories/document.repository.js";
import { createDocument } from "../controllers/document.controller.js";

const documentRouter = Router();

documentRouter.get('/', getAllDocuments);
documentRouter.post('/', createDocument);
documentRouter.get('/:id', getDocumentById);
documentRouter.put('/:id', updateDocument);
documentRouter.delete('/:id', deleteDocument);

export { documentRouter }