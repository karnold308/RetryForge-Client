import axios from '../api/axios'
import useAuth from './useAuth'
import type { AuthData } from '../models/types';
import { useCallback } from 'react';

const AUTH_URL = "/auth"

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = useCallback(async (): Promise<string> => {
        const resp = await axios.get<{ roles: number[]; accessToken: string, user: string }>
            (`${AUTH_URL}/refresh`,
                {
                    withCredentials: true
                }
            );

        setAuth((prev) => {
            return {
                ...prev,
                user: resp.data.user,
                roles: resp.data.roles,
                accessToken: resp.data.accessToken
            }

        });
        return resp.data.accessToken
    }, [setAuth]);

    return refresh;
}

export default useRefreshToken;
