type Username = string;
interface PartialUser {
    password: string;
    accessToken?: string;
}

interface User extends PartialUser {
    accessToken: string;
}

const store: Record<Username, User | undefined> = {};

function get(username: Username) {
    return store[username];
}

const generateAccessToken = (username: string) => username.split("").reverse().join();

function create(username: Username, properties: PartialUser): User {
    const newUser = {
        accessToken: properties.accessToken || generateAccessToken(username),
        password: properties.password,
    };
    store[username] = newUser;

    return newUser;
}

export default {
    create,
    get,
};
