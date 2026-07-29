import { useQuery } from "@tanstack/react-query"
import useAxiosPrivate from "../useAxiosPrivate"
import {
    getOverview, getRecentRecoveries, getSystemStatus,
    getTopOpportunities, getAnalytics, getCustomers, getRecoveries,
    getRecoveryDetails,
} from "../../api/dashboardApi"
import { dashboardKeys } from '../../hooks/dashboard/queryKeys'

export function useOverview() {
    const axiosPrivate = useAxiosPrivate()
    return useQuery({ queryKey: dashboardKeys.overview, queryFn: () => getOverview(axiosPrivate) })
}

export function useRecentRecoveries() {
    const axiosPrivate = useAxiosPrivate()
    return useQuery({ queryKey: dashboardKeys.recentRecoveries, queryFn: () => getRecentRecoveries(axiosPrivate) })
}

export function useSystemStatus() {
    const axiosPrivate = useAxiosPrivate()
    return useQuery({ queryKey: dashboardKeys.systemStatus, queryFn: () => getSystemStatus(axiosPrivate) })
}

export function useTopOpportunities() {
    const axiosPrivate = useAxiosPrivate()
    return useQuery({ queryKey: dashboardKeys.topOpportunities, queryFn: () => getTopOpportunities(axiosPrivate) })
}

export function useAnalytics() {
    const axiosPrivate = useAxiosPrivate()
    return useQuery({ queryKey: dashboardKeys.analytics, queryFn: () => getAnalytics(axiosPrivate) })
}

export function useCustomers() {
    const axiosPrivate = useAxiosPrivate()
    return useQuery({ queryKey: dashboardKeys.customers, queryFn: () => getCustomers(axiosPrivate) })
}

export function useRecoveries() {
    const axiosPrivate = useAxiosPrivate()
    return useQuery({ queryKey: dashboardKeys.recoveries, queryFn: () => getRecoveries(axiosPrivate) })
}

export function useRecoveryDetails(id: string | null) {
    const axiosPrivate = useAxiosPrivate()
    return useQuery({
        queryKey: [...dashboardKeys.recoveryDetails(id ?? "")],
        queryFn: () => getRecoveryDetails(axiosPrivate, id!),
        enabled: !!id
    })
}


