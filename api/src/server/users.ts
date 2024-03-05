import { Username } from "~/server/types";
import { User } from "global/types";

const users: Record<Username, User> = {};

function get(username: Username) {
    return users[username];
}

function create(username: Username, properties: User): User {
    const newUser: User = {
        name: username,
        password: properties.password,
    };
    users[username] = newUser;

    return newUser;
}

function remove(username: Username) {
    const userFound = users[username];

    if (!userFound) {
        return;
    }

    delete users[username];
}

export default {
    create,
    get,
    remove,
};
