import { PartialUser, User } from "global/types";

type Username = string;

const store: Record<Username, User | undefined> = {};

function get(username: Username) {
    return store[username];
}

const generateAccessToken = (username: string) => username.split("").reverse().join();

function create(username: Username, properties: PartialUser): User {
    const newUser: User = {
        accessToken: properties.accessToken || generateAccessToken(username),
        name: username,
        password: properties.password,
    };
    store[username] = newUser;

    return newUser;
}

export default {
    create,
    get,
};
