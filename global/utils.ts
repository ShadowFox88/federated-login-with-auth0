// TODO: Add to personal utils submodule
export function quickResponseWithStatus(status: number): Response;
export function quickResponseWithStatus(status: number, payload: null): Response;
export function quickResponseWithStatus<Type extends object>(
    status: number,
    payload: Type,
): Response;
export function quickResponseWithStatus<Type extends object | null>(
    status: number,
    payload?: Type,
): Response {
    if (payload) {
        return Response.json(payload, { status });
    }

    return new Response(null, { status });
}

// TODO: Replace with personal utils library
export function formDataToJson<Type>(eventTarget: EventTarget): Type {
    const formData = new FormData(eventTarget as HTMLFormElement);

    return Object.fromEntries(formData.entries()) as Type;
}
