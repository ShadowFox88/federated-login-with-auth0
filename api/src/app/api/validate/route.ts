import { Details, ValidatePayload } from "global/types";
import { quickResponseWithStatus } from "global/utils";

import store from "~/server/store";

export async function POST(request: Request) {
    const details: Details = await request.json();
    const userFound = store.get(details.username);

    if (!userFound) {
        return quickResponseWithStatus<ValidatePayload<404>>(404, {
            message: "User does not exist",
        });
    }

    if (userFound.accessToken) {
        return quickResponseWithStatus<ValidatePayload>(200, {
            accessToken: userFound.accessToken,
            fresh: false,
        });
    }

    const newUser = store.create(details.username, {
        password: details.password,
    });

    return quickResponseWithStatus<ValidatePayload>(200, {
        accessToken: newUser.accessToken,
        fresh: true,
    });
}
