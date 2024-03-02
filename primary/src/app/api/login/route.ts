import { LogInPayload } from "global/types";
import { quickResponseWithStatus } from "global/utils";

export async function POST(request: Request) {
    const body = await request.json();
    const response = await fetch("http://localhost:3000/api/login", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body,
    });
    const payload: LogInPayload = await response.json();

    return quickResponseWithStatus(response.status, payload);
}
