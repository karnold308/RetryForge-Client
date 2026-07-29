import axios from '../api/axios'
import useAuth from './useAuth'
import { useCallback } from 'react'
import { useQueryClient } from "@tanstack/react-query"

const AUTH_URL = "/auth"

const useRefreshToken = () => {
    const { setAuth } = useAuth()
    const queryClient = useQueryClient()

    const refresh = useCallback(async (): Promise<string> => {
        const resp = await axios.get<{ userId: number, email: string, roles: number[], accessToken: string }>
            (`${AUTH_URL}/refresh`,
                {
                    withCredentials: true
                }
            )

        setAuth((prev) => {
            return {
                ...prev,
                userId: resp.data.userId,
                email: resp.data.email,
                roles: resp.data.roles,
                accessToken: resp.data.accessToken
            }

        })
        queryClient.invalidateQueries({ queryKey: ["me"] })
        return resp.data.accessToken
    }, [setAuth])

    return refresh
}

export default useRefreshToken
