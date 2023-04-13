import { getUser, postUser } from '../repositories/user.repository.js';

export async function save(data) {
    const user = await postUser({
        user: data.user,
        login: data.login,
        password: data.password
    });

    return user;
}

export async function findUser(id) {
    if (!id) {
        throw new Error('Invalid id!');
    }
    const user = await getUser(id);
    if (!user) {
        throw new Error('User not found!');
    }
    return user;
}

export async function findUserByEmail(login, password) {
    if (!login || !password) {
        throw new Error('Invalid or empty fields');
    }
    const user = await getUserByEmail(login);
    if (!user) {
        throw new Error('User not found!');
    }
    return user;
}
