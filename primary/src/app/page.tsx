"use client";

import { Details } from "@/shared/types";

function formDataToJson<Type>(eventTarget: EventTarget): Type {
    const formData = new FormData(eventTarget as HTMLFormElement);

    return Object.fromEntries(formData.entries()) as Type;
}

export default function Home() {
    const postLoginDetails = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const details = formDataToJson<Details>(event.target);
        await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(details),
        });
    };

    return (
        <form className="box-border flex flex-col gap-2 p-4" onSubmit={postLoginDetails}>
            <input
                className="input input-bordered w-full max-w-xs"
                placeholder="Type here"
                name="username"
                type="text"
                required
            />
            <input
                className="input input-bordered w-full max-w-xs"
                placeholder="Type here"
                name="password"
                type="password"
                required
            />

            <button className="btn" type="submit">
                Submit
            </button>
        </form>
    );
}
