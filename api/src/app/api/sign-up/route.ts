import accessTokens from "~/server/access-tokens";
import users from "~/server/users";
import { Details, SignUpPayload } from "global/types";
import { quickResponseWithStatus } from "global/utils";

import type { SafeUser } from "global/types";

export async function POST(request: Request) {
    const details: Details = await request.json();
    const userFound = users.get(details.username);

    if (userFound) {
        return quickResponseWithStatus<SignUpPayload<401>>(401, {
            message: "User already exists",
        });
    }

    const newUser = users.create(details.username, {
        password: details.password,
        name: details.username,
    });
    const newAccessToken = accessTokens.create(details.username);
    const safeUser: SafeUser = {
        name: newUser.name,
    };

    return quickResponseWithStatus<SignUpPayload>(200, {
        accessToken: newAccessToken,
        message: "Successfully created user",
        user: safeUser,
    });
}
