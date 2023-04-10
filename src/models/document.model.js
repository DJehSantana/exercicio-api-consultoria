import mongoose, { Schema } from "mongoose";

const erroRequired = "Campo obrigatório!";

const DocumentSchema = new Schema({
    classe: {
        type: String,
        required: [true, erroRequired]
    },
    modalidade: {
        type: String,
        required: [true, erroRequired]
    },
    processo_adm: {
        type: String,
        required: [true, erroRequired]
    },
    municipio: {
        type: String,
        required: [true, erroRequired]
    },
    data_emissao: {
        type: Date,
        required: [true, erroRequired]
    },
    data_vencimento: {
        type: Date,
        required: [true, erroRequired]
    },
    id_cliente: {
        type: Number,
        required: [true, erroRequired]
    }
});

export const Document = mongoose.model('documents', DocumentSchema);
