
import { axiosPrivate } from "../api/axios"
import { InternalAxiosRequestConfig } from "axios"
import { useEffect } from "react"
import useRefreshToken from "./useRefreshToken"
import useAuth from './useAuth'


interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    sent?: boolean;
}

const useAxiosPrivate = () => {
    console.log('in useAxiosPrivate')
    const refresh = useRefreshToken()
    const { auth } = useAuth()

    useEffect(() => {
        // Request interceptor attaches the current token to outgoing private calls
        const reqIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        )

        // Response interceptor watches for 403 errors and attempts a silent refresh
        const respIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config as CustomAxiosRequestConfig
                // If token expires (403 Forbidden) and we haven't tried refreshing yet
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true

                    try {
                        const newAccessToken = await refresh();
                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                        // Retry the original request with the fresh token
                        return axiosPrivate.request(prevRequest)
                    } catch (refreshError) {
                        // Optional: If refresh cookie is dead, you can trigger a logout routine here
                        return Promise.reject(refreshError)
                    }
                }

                return Promise.reject(error)
            }
        )

        // Clean up step: unbind these listeners whenever token updates or unmounts
        return () => {
            axiosPrivate.interceptors.request.eject(reqIntercept)
            axiosPrivate.interceptors.response.eject(respIntercept)
        }

    // depend directly on the string token, NOT the changing auth object    
    }, [auth?.accessToken, refresh])

    return axiosPrivate
}

export default useAxiosPrivate
