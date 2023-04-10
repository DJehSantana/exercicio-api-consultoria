import { Document } from "../models/document.model.js";

export async function postDocument(document) {
    return await Document.create(document);
}

export async function getAllDocuments() {
    return await Document.find();
}

export async function getDocumentById(id) {
    return await Document.findById(id);
}

export async function deleteDocument(id) {
    await Document.findByIdAndDelete(id);
}

export async function updateDocument(id, data) {
    return await Document.findByIdAndUpdate(id, data);
}