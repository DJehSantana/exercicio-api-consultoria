import { Document } from "../models/document.model.js";
import { Post } from "../models/post.documents.model.js";

export async function postDocument(document) {
    return await Document.create(document);
}

export async function getAllDocuments() {
    return await Document.find();
}

export async function getDocumentById(id) {
    const document = await Document.findById(id);
    if (!document) {
        return null;
    }
    return document;
}

export async function deleteDocument(id) {
    await Document.findByIdAndDelete(id);
}

export async function updateDocument(id, data) {
    return await Document.findByIdAndUpdate(id, data, { new: true });
}

export async function findDocumentsByParams(filter) {
    const documents = await Document.find(filter)

    return documents;
}

export async function uploadDocumentRepository(document) {
    return await Post.create(document);
}

export async function downloadDocumentRepository(id) {
  return await Post.findById(id);
}