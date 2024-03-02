"use client";

import { formDataToJson } from "global/utils";
import { useState } from "react";

import { LogInPayload, SignUpPayload } from "~/shared/types";

type Payload<
    ButtonType extends string = "",
    Status extends number = 200,
> = ButtonType extends "login"
    ? LogInPayload<Status>
    : ButtonType extends "sign-up"
      ? SignUpPayload<Status>
      : never;

type SubmitButtonType = "login" | "sign-up";

export default function Home() {
    const [output, setOutput] = useState("");
    const [outputClassName, setOutputClassName] = useState("");

    const clearOutput = () => setOutput("");

    const postLoginDetails = async (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        event.preventDefault();

        const details = JSON.stringify(formDataToJson(event.target));
        const apiEndpoint = event.nativeEvent.submitter?.id as SubmitButtonType;
        const apiRoute = `/api/${apiEndpoint}`;
        const response = await fetch(apiRoute, {
            body: JSON.stringify(details),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        let newOutput: string | null = "";
        let newOutputClassName = "text-green-500";

        if (!response.ok) {
            newOutputClassName = "text-red-500";

            if (apiEndpoint === "login") {
                const payload: Payload<"login", 404> = await response.json();
                newOutput = payload.message;
            } else if (apiEndpoint === "sign-up") {
                const payload: Payload<"sign-up", 401> = await response.json();
                newOutput = payload.message;
            }
        } else {
            newOutput = apiEndpoint === "sign-up" ? "User created" : "User logged in";
        }

        setOutputClassName(newOutputClassName);
        setOutput(newOutput);
    };

    return (
        <form className="box-border flex max-w-xs flex-col gap-4 p-6" onSubmit={postLoginDetails}>
            <div className="flex flex-col gap-2">
                <input
                    className="input input-bordered w-full"
                    placeholder="Type here"
                    name="username"
                    type="text"
                    required
                />
                <input
                    className="input input-bordered w-full"
                    placeholder="Type here"
                    name="password"
                    type="password"
                    required
                />

                {!output ? null : <span className={outputClassName}>{output}</span>}
            </div>

            <div className="flex gap-1.5">
                <button
                    className="btn grow bg-green-400"
                    id="login"
                    onClick={clearOutput}
                    type="submit"
                >
                    Login
                </button>
                <button
                    className="btn grow bg-yellow-300"
                    id="sign-up"
                    onClick={clearOutput}
                    type="submit"
                >
                    Sign Up
                </button>
            </div>
        </form>
    );
}
