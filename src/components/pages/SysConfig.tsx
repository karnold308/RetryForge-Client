

import { ROLES } from "../../config/roles"
import useAuth from "../../hooks/useAuth"
import { isAuthenticated } from "../../utils/authUtility"
import { Navigate, useLocation } from "react-router-dom"
import { useSysConfig } from '../../hooks/dashboard/queries'
import { SysConfig } from "../../models/types"

type RoleName = typeof ROLES[keyof typeof ROLES]

interface AdminLogsProps {
    allowedRoles: RoleName[]
}



export default function AdminLogs({ allowedRoles }: AdminLogsProps) {
    const { auth } = useAuth()
    const location = useLocation()


    const numericRoles = Array.isArray(auth?.roles)
        ? auth.roles
        : []

    const userRoleNames = numericRoles.map(role => ROLES[role as keyof typeof ROLES]);

    const hasRequiredRole = userRoleNames.some(name =>
        name && allowedRoles.includes(name as RoleName)
    )

    const sysCofnigQuery = useSysConfig(hasRequiredRole)

    // const isLoading = hasRequiredRole && adminLogsQuery.isPending
    const sysConfigs = sysCofnigQuery.data ?? []
    // const isError = hasRequiredRole && adminLogsQuery.isError
    // let adminLogsQuery
    // let isLoading
    // let adminLogs
    // let isError


    if (!isAuthenticated(auth) || !hasRequiredRole) {
        return (
            <Navigate
                to="/dashboard"
                state={{ from: location }}
                replace
            />
        )
    }

    if (sysCofnigQuery.isPending) {
        return (
            <div className="p-6">
                Loading system configs...
            </div>
        )
    }

    if (sysCofnigQuery.isError) {
        return (
            <div className="p-6 text-red-600">
                Failed to load system configs.
            </div>
        )
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">
                    System Configuration
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    
                </p>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                Config name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                Config value
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                User UUID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                Last updated at
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sysConfigs?.map((sysConfig: SysConfig) => (
                            <tr key={sysConfig.id}>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    {sysConfig.config_name}
                                </td>
                                <td className="px-4 py-3">
                                    {sysConfig.config_value}
                                </td>
                                <td className="px-4 py-3">
                                    {sysConfig.last_updated_user_uuid}
                                </td>
                                <td className="px-4 py-3">
                                    {new Date(sysConfig.updated_at)
                                        .toLocaleString()
                                    }
                                </td>
                            </tr>
                        ))}
                        {sysConfigs?.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                    No configs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )

}