import { Username } from "~/server/types";
import { User } from "global/types";

const users: Record<Username, User | undefined> = {};

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

export default {
    create,
    get,
};
