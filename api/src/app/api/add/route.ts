import { AddPayload, Details } from "global/types";
import { quickResponseWithStatus } from "global/utils";

import store from "~/server/store";

export async function POST(request: Request) {
    const details: Details = await request.json();
    const userFound = store.get(details.username);

    if (userFound) {
        return quickResponseWithStatus<AddPayload>(401, {
            message: "User already exists",
        });
    }

    store.create(details.username, {
        password: details.password,
    });

    return quickResponseWithStatus<AddPayload>(200, {
        message: "Successfull created user",
    });
}
