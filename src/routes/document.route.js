import { Router } from "express";
import {
  createDocument,
  findAllDocuments,
  findDocumentById,
  updateDocument,
  deleteDocument,
  findDocumentsWithParams,
  uploadDocumentS3,
  downloadDocumentS3,
} from "../controllers/document.controller.js";
import multer from "multer";
import multerConfig from "../config/multer.cjs";

const documentRouter = Router();

documentRouter.post(
  "/upload",
  multer(multerConfig).single("file"),
  uploadDocumentS3
);
documentRouter.get("/download/:id", downloadDocumentS3);
documentRouter.get('/', findAllDocuments);
documentRouter.get('/data', findDocumentsWithParams);
documentRouter.post('/', createDocument);
documentRouter.get('/:id', findDocumentById);
documentRouter.put('/:id', updateDocument);
documentRouter.delete('/:id', deleteDocument);

export { documentRouter }