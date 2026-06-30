import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosPrivate from '../useAxiosPrivate'
import { retryRecovery } from '../../api/dashboardApi'
import { dashboardKeys } from './queryKeys'
import toast from 'react-hot-toast'

export function useRetryRecovery() {
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) =>
            retryRecovery(axiosPrivate, id),

        onSuccess: () => {
            toast.success("Retry scheduled.")
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

