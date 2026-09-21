import { AxiosInstance } from 'axios'

export const getAdminLogs = async (axiosPrivate: AxiosInstance) => {
    const response = await axiosPrivate.get('/api/admin/logs')
    return response.data
}

export const getSysConfigs = async (axiosPrivate: AxiosInstance) => {
    const response = await axiosPrivate.get('/api/admin/configs')
    return response.data
}
