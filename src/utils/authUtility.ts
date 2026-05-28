import type { AuthData } from "../models/types";

export const isAuthenticated = (auth: AuthData | null | undefined) =>
    !!auth?.accessToken;