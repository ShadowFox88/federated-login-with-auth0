export interface Details {
    username: string;
    password: string;
}

export interface User {
    name: string;
    password: string;
}

export type SafeUser = Omit<User, "password">;

export type AccessToken = string;
export type Status<HTTPCodes extends number> = number | HTTPCodes;

// TODO: Refactor using tRPC
export type LogInPayload<HTTPCode extends Status<200 | 404> = 200> =
    HTTPCode extends 200 ?
        {
            accessToken: AccessToken;
            message: string;
            user: SafeUser;
        }
    : HTTPCode extends 404 ?
        {
            message: string;
        }
    :   never;

export type SignUpPayload<HTTPCode extends Status<200 | 401> = 200> =
    HTTPCode extends 200 ?
        {
            accessToken: AccessToken;
            user: SafeUser;
            message: string;
        }
    :   {
            message: string;
        };

export type UsersPayload<HTTPCode extends Status<200 | 403 | 404> = 200> =
    HTTPCode extends 200 ?
        {
            user: SafeUser;
        }
    : HTTPCode extends 403 | 404 ?
        {
            message: string;
        }
    :   never;

export type LogOutPayload = {
    message: string;
};
