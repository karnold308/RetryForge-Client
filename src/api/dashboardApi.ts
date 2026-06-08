import { AxiosInstance } from 'axios'

export const getOverview = async (
    axiosPrivate: AxiosInstance) => {
    const response = await axiosPrivate.get('/api/dashboard/overview')

    return response.data
}

export const getRecoveries = async (
    axiosPrivate: AxiosInstance) => {
    const response = await axiosPrivate.get('/api/dashboard/recoveries')

    return response.data
}

export const getCustomers = async (
    axiosPrivate: AxiosInstance) => {
    const response = await axiosPrivate.get('/api/dashboard/customers')

    return response.data
}

