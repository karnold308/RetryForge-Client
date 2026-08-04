

import { ROLES } from "../../config/roles"
import useAuth from "../../hooks/useAuth"
import { isAuthenticated } from "../../utils/authUtility"
import { Navigate, useLocation } from "react-router-dom"
import { useAdminLogs } from '../../hooks/dashboard/queries'
import { ErrorLog } from "../../models/types"
import { useState } from "react"

type RoleName = typeof ROLES[keyof typeof ROLES]

interface AdminLogsProps {
    allowedRoles: RoleName[]
}


export default function AdminLogs({ allowedRoles }: AdminLogsProps) {
    const { auth } = useAuth()
    const location = useLocation()
    const [selectedLog, setSelectedLog] = useState<ErrorLog | null>(null)
    let adminLogsQuery
    let isLoading
    let adminLogs
    let isError
    const numericRoles = Array.isArray(auth?.roles)
        ? auth.roles
        : []

    const userRoleNames = numericRoles.map(role => ROLES[role as keyof typeof ROLES]);

    const hasRequiredRole = userRoleNames.some(name =>
        name && allowedRoles.includes(name as RoleName)
    )

    if (hasRequiredRole) {
        adminLogsQuery = useAdminLogs()
        isLoading = adminLogsQuery.isPending
        adminLogs = adminLogsQuery.data
        isError = adminLogsQuery.isError
    }


    if (isLoading) {
        return (
            <div className="p-6">
                Loading errors...
            </div>
        )
    }


    if (isError) {
        return (
            <div className="p-6 text-red-600">
                Failed to load error logs.
            </div>
        )
    }

    return isAuthenticated(auth) && hasRequiredRole ? (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">
                    Application Errors
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Latest 100 application errors
                </p>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                Time
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                Level
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                Source
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                Message
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                User
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                                Stripe Account
                            </th>
                            <th className="px-4 py-3">
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {adminLogs?.map((log: ErrorLog) => (
                            <tr key={log.id}>
                                <td className="px-4 py-3 text-sm whitespace-nowrap">
                                    {new Date(log.created_at)
                                        .toLocaleString()
                                    }
                                </td>
                                <td className="px-4 py-3">
                                    <span className="
                                            inline-flex
                                            rounded-full
                                            bg-red-100
                                            px-2
                                            py-1
                                            text-xs
                                            font-medium
                                            text-red-700
                                        ">
                                        {log.level}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    {log.source}
                                </td>
                                <td className="px-4 py-3 text-sm max-w-xs truncate">
                                    {log.message}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    {log.user?.email ?? log.user_id ?? "-"}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    {log.stripeAccount?.stripe_account_id ?? log.stripe_account_uuid ?? "-"}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button className="text-sm text-blue-600 hover:underline"
                                        onClick={() => setSelectedLog(log)}>
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {adminLogs?.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                    No errors found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {selectedLog && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={() => setSelectedLog(null)}>
                    <div
                        className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <h2 className="text-xl font-semibold">
                                Error Details
                            </h2>
                            <button
                                onClick={() => setSelectedLog(null)}
                                className="text-gray-500 hover:text-black text-xl">
                                x
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs uppercase text-gray-500">
                                        Time
                                    </p>
                                    <p>
                                        {new Date(selectedLog.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-gray-500">
                                        Level
                                    </p>
                                    <p>{selectedLog.level}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-gray-500">
                                        Source
                                    </p>
                                    <p>{selectedLog.source}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-gray-500">
                                        User
                                    </p>
                                    <p>{selectedLog.user?.email ?? "-"}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-gray-500">
                                        Stripe Account
                                    </p>
                                    <p>
                                        {selectedLog.stripeAccount?.stripe_account_id ?? "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-gray-500">
                                        Message
                                    </p>
                                    <p>{selectedLog.message}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs uppercase text-gray-500 mb-2">
                                    Error
                                </p>
                                <pre className="bg-gray-100 rounded p-3 text-sm whitespace-pre-wrap break-words">
                                    {selectedLog.metadata?.error}
                                </pre>
                            </div>
                            <div>
                                <p className="text-xs uppercase text-gray-500 mb-2">
                                    Stack Trace
                                </p>
                                <pre className="bg-gray-900 text-green-300 rounded p-4 text-xs overflow-x-auto whitespace-pre-wrap break-words">
                                    {selectedLog.metadata?.stack}
                                </pre>
                            </div>
                            <div>
                                <p className="text-xs uppercase text-gray-500 mb-2">
                                    Metadata
                                </p>
                                <pre className="bg-gray-100 rounded p-4 text-xs overflow-x-auto">
                                    {JSON.stringify(selectedLog.metadata, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    ) : (
        <Navigate to="/dashboard" state={{ from: location }} replace />
    )

}
