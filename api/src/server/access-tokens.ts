import { Username } from "~/server/types";
import { getKeyByValue } from "~/server/utils";
import { AccessToken } from "global/types";

const accessTokens: Record<Username, AccessToken> = {};

function get(username: Username): AccessToken | undefined {
    return accessTokens[username];
}

function generateAccessToken(username: Username): AccessToken {
    return username.split("").reverse().join();
}

function create(username: Username): AccessToken {
    const newAccessToken = generateAccessToken(username);
    accessTokens[username] = newAccessToken;

    return newAccessToken;
}

function find(accessToken: AccessToken): AccessToken | undefined {
    return Object.values(accessTokens).find(value => accessToken === value);
}

function remove(accessToken: AccessToken) {
    const keyFound = getKeyByValue(accessTokens, accessToken);

    if (!keyFound) {
        return;
    }

    delete accessTokens[keyFound];
}

export default {
    store: accessTokens,
    create,
    get,
    find,
    remove,
};
