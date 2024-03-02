export interface Details {
    username: string;
    password: string;
}
type Message = { message: string };
export type ValidatePayload<Status extends number = 200> = Status extends 200
    ? {
          accessToken: string;
          fresh: boolean;
      }
    : Status extends 404
      ? Message
      : never;
export type AddPayload<Status extends number = 200> = Status extends 200
    ? null
    : Status extends 401
      ? Message
      : never;
