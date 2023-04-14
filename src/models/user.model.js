import mongoose, { Schema } from 'mongoose';


const erroRequired = "Campo obrigatório!";

const UserSchema = new Schema({
    user: {
        type: String,
        required: [true, erroRequired]
    },

    login: {
        type: String,
        required: [true, erroRequired]
    },

    password: {
        type: String,
        required: [true, erroRequired]
    },
    token: {
        type: String
    }
});

export const User = mongoose.model('users', UserSchema);