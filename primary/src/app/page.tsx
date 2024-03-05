"use client";

import { getCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";

import NavBar from "~/components/navbar";
import { AccessToken, LogInPayload, SafeUser, SignUpPayload } from "global/types";
import { formDataToJson } from "global/utils";

import type { UsersPayload } from "global/types";

type SubmitButtonType = "login" | "sign-up";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const ignoreCleanup = () => {};

export default function Home() {
    const [user, setUser] = useState<SafeUser>();
    const [output, setOutput] = useState("");
    const [outputClassName, setOutputClassName] = useState("");
    const accessToken = getCookie("accessToken");

    const clearOutput = () => setOutput("");

    const fetchUser = async (): Promise<void> => {
        if (!accessToken) {
            return;
        }

        const body = JSON.stringify({ accessToken });
        // TODO: Prefer reading cookies from request on server over passing access token through
        // requests
        const response = await fetch("/api/users", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body,
        });

        if (!response.ok) {
            return;
        }

        const payload: UsersPayload = await response.json();

        setUser(payload.user);
    };

    // TODO: Refactor - break out into 2 separate functions handling logging in and signing up
    // separately
    const postLoginDetails = async (
        event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
    ): Promise<void> => {
        event.preventDefault();

        const details = JSON.stringify(formDataToJson(event.target));
        const apiEndpoint = event.nativeEvent.submitter?.id as SubmitButtonType;
        const apiRoute = `/api/${apiEndpoint}`;
        const response = await fetch(apiRoute, {
            body: details,
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        let newOutputClassName = "text-green-500";
        let newOutput = "";

        // TODO: Refactor?
        if (!response.ok) {
            newOutputClassName = "text-red-500";

            if (apiEndpoint === "login") {
                const payload: LogInPayload<404> = await response.json();
                newOutput = payload.message;
            } else if (apiEndpoint === "sign-up") {
                const payload: SignUpPayload<401> = await response.json();
                newOutput = payload.message;
            }
        } else {
            let newUser: SafeUser | undefined;
            let newAccessToken: AccessToken | undefined;

            if (apiEndpoint === "login") {
                const payload: LogInPayload = await response.json();
                newOutput = payload.message;
                newUser = payload.user;
                newAccessToken = payload.accessToken;
            } else if (apiEndpoint === "sign-up") {
                const payload: SignUpPayload = await response.json();
                newOutput = payload.message;
                newUser = payload.user;
                newAccessToken = payload.accessToken;
            }

            if (newUser && newAccessToken) {
                setUser(newUser);
                setCookie("accessToken", newAccessToken);
            }
        }

        setOutputClassName(newOutputClassName);
        setOutput(newOutput);
    };

    useEffect(() => {
        fetchUser();

        return ignoreCleanup;
    }, []);

    return (
        <main>
            <NavBar user={user} />

            <form
                className="box-border flex max-w-xs flex-col gap-4 p-6"
                onSubmit={postLoginDetails}
            >
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
        </main>
    );
}
