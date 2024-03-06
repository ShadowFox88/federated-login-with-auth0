import accessTokens from "~/server/access-tokens";
import users from "~/server/users";
import { AccessToken, UsersPayload } from "global/types";
import { quickResponseWithStatus } from "global/utils";

import type { SafeUser } from "global/types";

interface Details {
    accessToken: AccessToken;
}

export async function POST(request: Request) {
    const details: Details = await request.json();
    const accessTokenFound = accessTokens.find(details.accessToken);

    if (!accessTokenFound) {
        return quickResponseWithStatus<UsersPayload<404>>(404, {
            message: "Access token not found",
        });
    }

    const userFound = users.get(details.accessToken);

    if (!userFound) {
        return quickResponseWithStatus<UsersPayload<403>>(403, {
            message: "Invalid access token",
        });
    }

    const safeUser: SafeUser = {
        name: userFound.name,
    };

    return quickResponseWithStatus<UsersPayload>(200, {
        user: safeUser,
    });
}
