import { Router } from "express";
import { createDocument, findAllDocuments, findDocumentById, updateDocument, deleteDocument, findDocumentsWithParams } from "../controllers/document.controller.js";

const documentRouter = Router();

documentRouter.get('/', findAllDocuments);
documentRouter.get('/data', findDocumentsWithParams);
documentRouter.post('/', createDocument);
documentRouter.get('/:id', findDocumentById);
documentRouter.put('/:id', updateDocument);
documentRouter.delete('/:id', deleteDocument);

export { documentRouter }