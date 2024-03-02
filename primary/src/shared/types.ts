import { AddPayload, ValidatePayload } from "global/types";

export type LogInPayload<Status extends number> = ValidatePayload<Status>;
export type SignUpPayload<Status extends number> = AddPayload<Status>;
