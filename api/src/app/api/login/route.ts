import store from "~/server/store";
import { Details, LogInPayload } from "global/types";
import { quickResponseWithStatus } from "global/utils";

export async function POST(request: Request) {
    const details: Details = await request.json();
    const userFound = store.get(details.username);

    if (!userFound) {
        return quickResponseWithStatus<LogInPayload<404>>(404, {
            message: "User does not exist",
        });
    }

    if (userFound.accessToken) {
        return quickResponseWithStatus<LogInPayload>(200, {
            fresh: false,
            user: userFound,
        });
    }

    const newUser = store.create(details.username, {
        password: details.password,
        name: details.username,
    });

    return quickResponseWithStatus<LogInPayload>(200, {
        fresh: true,
        user: newUser,
    });
}
