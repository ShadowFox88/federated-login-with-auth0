import accessTokens from "~/server/access-tokens";
import { getKeyByValue } from "~/server/utils";

import type { Username } from "~/server/types";
import type { AccessToken } from "global/types";

export default function findUsernameFromAccessToken(accessToken: AccessToken) {
    const maybeUsername: Username | undefined = getKeyByValue(accessTokens.store, accessToken);

    return maybeUsername;
}
