import { AccessToken } from "global/types";
import { Username } from "~/server/types";

const accessTokens: Record<Username, AccessToken> = {};

// TODO: Add to personal utils submodule
function getKeyByValue<Value, Type extends Record<string, Value>>(
    object: Type,
    value: Value,
): keyof Type | undefined {
    return Object.keys(object).find(key => object[key] === value);
}

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
    return getKeyByValue(accessTokens, accessToken);
}

export default {
    create,
    find,
    get,
};
