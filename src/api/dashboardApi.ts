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

