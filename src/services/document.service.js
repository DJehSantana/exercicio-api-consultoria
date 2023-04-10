import { postDocument } from "../repositories/document.repository.js";

export async function saveDocument(data) {
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