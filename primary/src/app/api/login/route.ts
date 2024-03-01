import { Details } from "@/shared/types";

export async function POST(request: Request) {
    const details: Details = await request.json();

    console.log(details.username, "*".repeat(details.password.length));

    return Response.json({ name: "Hello, world!" });
}
