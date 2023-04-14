import { postDocument, getAllDocuments, getDocumentById, updateDocument, deleteDocument, findDocumentsForDueDate } from "../repositories/document.repository.js";

export async function save(data) {
    const document = await postDocument({
        classe: data.classe,
        modalidade: data.modalidade,
        processo_adm: data.processo_adm,
        municipio: data.municipio,
        data_emissao: data.data_emissao,
        data_vencimento: data.data_vencimento,
        id_cliente: data.id_cliente
    });

    return document;
}

export async function getAll() {
    return await getAllDocuments();
}

export async function getById(id) {
    if (!id) {
        throw new Error('Invalid id!');
    }
    const document = await getDocumentById(id);
    if (!document) {
        throw new Error('Register not found!');
    }
    return document;
}

export async function getByDuoDate(dataVencimento) {
    let dataFormatada;
    if (typeof (dataVencimento) != Date) {
        dataFormatada = new Date(dataVencimento);
        console.log(dataFormatada);
    }
    const documents = await findDocumentsForDueDate(dataFormatada);
    if (!documents) {
        return null;
    }
    return documents;

}

export async function update(id, data) {
    if (!id) {
        throw new Error('Invalid id!');
    }
    if (!data) {
        throw new Error('Invalid data!');
    }
    const document = await updateDocument(id, data);
    return document;
}

export async function deleteById(id) {
    if (!id) {
        throw new Error('Invalid id!');
    }
    return await deleteDocument(id);
}