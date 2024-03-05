import accessTokens from "~/server/access-tokens";
import users from "~/server/users";
import { Details, LogInPayload, SafeUser } from "global/types";
import { quickResponseWithStatus } from "global/utils";

export async function POST(request: Request) {
    const details: Details = await request.json();
    const userFound = users.get(details.username);

    if (!userFound) {
        return quickResponseWithStatus<LogInPayload<404>>(404, {
            message: "User does not exist",
        });
    }

    const safeUser: SafeUser = {
        name: userFound.name,
    };
    const accessTokenFound = accessTokens.get(details.username);

    if (accessTokenFound) {
        return quickResponseWithStatus<LogInPayload>(200, {
            accessToken: accessTokenFound,
            message: "Successfully logged in",
            user: safeUser,
        });
    }

    const newAccessToken = accessTokens.create(details.username);

    return quickResponseWithStatus<LogInPayload>(200, {
        accessToken: newAccessToken,
        message: "Successfully logged in",
        user: safeUser,
    });
}
