import { Details, SignUpPayload } from "global/types";
import { quickResponseWithStatus } from "global/utils";

import store from "~/server/store";

export async function POST(request: Request) {
    const details: Details = await request.json();
    const userFound = store.get(details.username);

    if (userFound) {
        return quickResponseWithStatus<SignUpPayload>(401, {
            message: "User already exists",
        });
    }

    store.create(details.username, {
        password: details.password,
        name: details.username,
    });

    return quickResponseWithStatus<SignUpPayload>(200, {
        message: "Successfully created user",
    });
}
