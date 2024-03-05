import findUsernameFromAccessToken from "~/interfaces/findUsernameFromAccessToken";
import accessTokens from "~/server/access-tokens";
import users from "~/server/users";
import { AccessToken, LogOutPayload } from "global/types";
import { quickResponseWithStatus } from "global/utils";

interface Details {
    accessToken?: AccessToken;
}

export async function POST(request: Request) {
    const details: Details = await request.json();

    if (!details.accessToken) {
        return quickResponseWithStatus<LogOutPayload>(401, {
            message: "Invalid logout request",
        });
    }

    const usernameFound = findUsernameFromAccessToken(details.accessToken);

    if (!usernameFound) {
        return quickResponseWithStatus<LogOutPayload>(404, {
            message: "No user found with specified access token",
        });
    }

    accessTokens.remove(details.accessToken);

    return quickResponseWithStatus<LogOutPayload>(200, {
        message: "Successfully logged out",
    });
}
