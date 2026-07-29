import { AxiosInstance } from 'axios'

export const getOverview = async (axiosPrivate: AxiosInstance) => {
    const response = await axiosPrivate.get('/api/dashboard/overview')
    return response.data
}

export const getRecoveries = async (axiosPrivate: AxiosInstance) => {
    const response = await axiosPrivate.get('/api/dashboard/recoveries')
    return response.data
}

export const getCustomers = async (axiosPrivate: AxiosInstance) => {
    const response = await axiosPrivate.get('/api/dashboard/customers')
    return response.data
}

export const getAnalytics = async (axiosPrivate: AxiosInstance) => {
    const response = await axiosPrivate.get('/api/dashboard/analytics')
    return response.data
}


export const getRecoveryDetails = async (axiosPrivate: AxiosInstance, id: string) => {
    const response = await axiosPrivate.get(`/api/dashboard/recoveries/${id}`)
    return response.data
}

export const getRecentRecoveries = async (axiosPrivate: AxiosInstance) => {
    const response = await axiosPrivate.get('/api/dashboard/recentrecoveries')
    return response.data
}

export const getSystemStatus = async (axiosPrivate: AxiosInstance) => {
    const response = await axiosPrivate.get('/api/dashboard/systemstatus')
    return response.data
}

export const getAtRiskCustomers = async (axiosPrivate: AxiosInstance) => {
    const response = await axiosPrivate.get('/api/dashboard/customers/at-risk')
    return response.data
}


export const getTopOpportunities = async (axiosPrivate: AxiosInstance) => {
    const response = await axiosPrivate.get('/api/dashboard/customers/topopportunities')
    return response.data
}

export const retryRecovery = async (axiosPrivate: AxiosInstance, id: string) => {
    const response = await axiosPrivate.post(`/api/dashboard/recoveries/${id}/retry`)
    return response.data
}


export const retryHistorySync = async(axiosPrivate: AxiosInstance) => {
    axiosPrivate.get('/api/stripe/historySync')
}

