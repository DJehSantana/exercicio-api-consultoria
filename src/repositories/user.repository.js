import { User } from '../models/user.model.js';

export async function postUser(user) {
    return await User.create(user);
}

export async function getUser(id) {
    return await User.findById(id);
}

export async function getUserByEmail(login) {
    return await User.findOne({ login: login });
}