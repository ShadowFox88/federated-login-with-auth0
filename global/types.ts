interface Message {
    message: string;
}

export interface Details {
    username: string;
    password: string;
}

export interface PartialUser {
    accessToken?: string;
    name: string;
    password: string;
}

export interface User extends PartialUser {
    accessToken: string;
}

export type LogInPayload<Status extends number = 200> = Status extends 200
    ? {
          fresh: boolean;
          user: User;
      }
    : Status extends 404
      ? Message
      : never;

export type SignUpPayload = Message;
