import { postDocument, getAllDocuments, getDocumentById, updateDocument, deleteDocument,  findDocumentsByParams } from "../repositories/document.repository.js";

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

export async function getByParams({data_vencimento, id_cliente, data_emissao}) {

    let filter = {}
    if (data_vencimento) {
        filter.data_vencimento = { $lte: new Date(data_vencimento) }
    }

    if (data_emissao) {
        filter.data_emissao = { $gte: new Date(data_emissao) }
    }

    if(id_cliente) {
        filter.id_cliente =id_cliente
    }

    console.log('filters: ', filter)

    const documents = await findDocumentsByParams(filter);
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