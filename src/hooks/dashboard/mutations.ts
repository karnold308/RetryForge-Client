import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosPrivate from '../useAxiosPrivate'
import { retryRecovery } from '../../api/dashboardApi'
import { dashboardKeys } from './queryKeys'
import toast from 'react-hot-toast'
import axios from "../../api/axios"
import {
    ApiError,
    ApiErrorResponse,
    ChangePasswordRequest,
    ForgotPasswordSuccess,
    ResendVerificationSuccess,
    ResetPasswordRequest
} from '../../models/types'
import { AxiosError, AxiosResponse } from 'axios'

const WEBHOOK_REFRESH_DELAYS = [2000, 5000, 10000]

export function useRetryRecovery() {
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()


    const invalidateRecoveryQueries = () => {
        queryClient.invalidateQueries({
            queryKey: dashboardKeys.recoveries
        })

        queryClient.invalidateQueries({
            queryKey: dashboardKeys.overview
        })

        queryClient.invalidateQueries({
            queryKey: dashboardKeys.topOpportunities
        })

        queryClient.invalidateQueries({
            queryKey: dashboardKeys.recentRecoveries
        })
    }

    return useMutation({
        mutationFn: (id: string) =>
            retryRecovery(axiosPrivate, id),

        onSuccess: () => {
            toast.success(
                "Retry scheduled. Waiting for Stripe confirmation..."
            )

            invalidateRecoveryQueries()
            WEBHOOK_REFRESH_DELAYS.forEach(delay => {
                setTimeout(invalidateRecoveryQueries, delay)
            })
        },
        onError: () => {
            toast.error("Unable to schedule retry.")
        }
    })
}

export function useUpdateSettings() {

}

export function useDisconnectStripe() {

}

export function useRefreshStripeConnection() {

}

// export function useHistorySync() {
//     const axiosPrivate = useAxiosPrivate()
//     const queryClient = useQueryClient()

//     return useMutation({
//         mutationFn: () =>
//             axiosPrivate.post("/history-sync"),
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: ["me"]
//             });
//         }
//     })
// }

export function useHistorySync() {
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()

    const refreshDashboardData = () => {
        queryClient.invalidateQueries({
            queryKey: dashboardKeys.overview
        })

        queryClient.invalidateQueries({
            queryKey: dashboardKeys.recentRecoveries
        })

        queryClient.invalidateQueries({
            queryKey: dashboardKeys.systemStatus
        })

        queryClient.invalidateQueries({
            queryKey: dashboardKeys.topOpportunities
        })
    }

    return useMutation({
        mutationFn: () => axiosPrivate.post("/api/stripe/historySync"),

        onSuccess: () => {
            toast.success("History import started.")

            queryClient.invalidateQueries({
                queryKey: ["me"]
            })

            refreshDashboardData()
        },

        onError: () => {
            toast.error("Unable to start history import.")
        }
    })
}

export function useSkipHistorySync() {
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => axiosPrivate.post("/api/stripe/historySync/skip"),

        onSuccess: () => {
            toast.success("Skipped history import.")

            queryClient.invalidateQueries({
                queryKey: ["me"]
            })
        },

        onError: () => {
            toast.error("Issue skipping import.")
        }
    })

}

export function useResendVerification() {
    return useMutation<
        AxiosResponse<ResendVerificationSuccess>,
        AxiosError<ApiError>,
        string
    >({
        mutationFn: (email: string) =>
            axios.post<ResendVerificationSuccess>(
                "/resend-verification",
                { email }
            )
    })
}

export function useForgotPassword() {
    return useMutation<
        AxiosResponse<ForgotPasswordSuccess>,
        AxiosError<ApiError>,
        string
    >({
        mutationFn: (email: string) =>
            axios.post<ForgotPasswordSuccess>(
                "/forgot-password",
                { email }
            )
    })
}

export function useResetPassword() {
    return useMutation<
        AxiosResponse<ForgotPasswordSuccess>,
        AxiosError<ApiErrorResponse>,
        ResetPasswordRequest
    >({
        mutationFn: ({ token, password }) =>
            axios.post<ForgotPasswordSuccess>(
                "/reset-password",
                { token, password }
            )
    })
}

export function useChangePassword() {
    const axiosPrivate = useAxiosPrivate()
    
    return useMutation<
        AxiosResponse<ForgotPasswordSuccess>,
        AxiosError<ApiError>,
        ChangePasswordRequest
    >({
        mutationFn: ({currentPassword, newPassword}) =>
            axiosPrivate.post<ForgotPasswordSuccess>(
                "/api/me/change-password",
                { currentPassword, newPassword }
            )
    })
}

