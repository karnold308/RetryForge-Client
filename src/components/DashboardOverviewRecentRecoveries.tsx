import { DashboardRecentRecovery } from '../models/types'
import { formatFailure, formatStripeCurrency, getTimeAgo } from '../utils/formatters'


interface RecentRecoveriesProps {
    recentRecoveries: DashboardRecentRecovery[] | undefined
}

export default function DashboardOverviewRecentRecoveries({ recentRecoveries }: RecentRecoveriesProps) {
    return (
            <div className="dashboard-card mb-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-semibold">
                            Recent Recoveries
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            The latest invoices successfully recovered.
                        </p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 text-sm font-medium text-gray-500">
                                        Customer
                                    </th>
                                    <th className="text-left py-3 text-sm font-medium text-gray-500">
                                        Amount
                                    </th>
                                    <th className="text-left py-3 text-sm font-medium text-gray-500">
                                        Failure Reason
                                    </th>
                                    <th className="text-left py-3 text-sm font-medium text-gray-500">
                                        Source
                                    </th>
                                    <th className="text-left py-3 text-sm font-medium text-gray-500">
                                        Attempts
                                    </th>
                                    <th className="text-left py-3 text-sm font-medium text-gray-500">
                                        Recovered
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {null != recentRecoveries && recentRecoveries?.length > 0 ? (
                                    recentRecoveries.map((recovery: DashboardRecentRecovery) => (
                                        <tr
                                            key={recovery.id}
                                            className="border-b border-gray-100 hover:bg-gray-50 transition"
                                        >
                                            <td className="py-4">
                                                <div className="font-medium text-gray-900">
                                                    {recovery.customer}
                                                </div>
                                            </td>
                                            <td className="py-4 font-medium">
                                                ${formatStripeCurrency(recovery.amount)}
                                            </td>
                                            <td className="py-4 font-medium">
                                                {formatFailure(recovery.failureReason)}
                                            </td>
                                            <td className="py-4">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
                                                                ${recovery.source === "retryforge"
                                                            ? "bg-green-100 text-green-800"
                                                            : recovery.source === "stripe"
                                                                ? "bg-blue-100 text-blue-800"
                                                                : "bg-gray-100 text-gray-800"
                                                        }`}
                                                >
                                                    {recovery.source === "retryforge"
                                                        ? "RetryForge"
                                                        : recovery.source === "stripe"
                                                            ? "Stripe"
                                                            : "Manual"}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <span>{recovery.attempts}</span>
                                            </td>
                                            <td className="py-4 text-gray-500">
                                                {getTimeAgo(recovery.recoveredAt)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="py-10 text-center text-gray-500"
                                        >
                                            No recovered invoices yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="space-y-3 md:hidden">
                        {recentRecoveries && recentRecoveries.length > 0 ? (
                            recentRecoveries.map((recovery) => (
                                <div key={recovery.id} className="rounded-lg border p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="font-medium">
                                                {recovery.customer}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {getTimeAgo(recovery.recoveredAt)}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold">
                                                ${formatStripeCurrency(recovery.amount)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1 text-sm">
                                        <div>
                                            <span className="font-medium">
                                                Failure:
                                            </span>{" "}
                                            {formatFailure(recovery.failureReason)}
                                        </div>
                                        <div>
                                            <span className="font-medium">
                                                Attempts:
                                            </span>{" "}
                                            {recovery.attempts}
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <span
                                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
                        ${recovery.source === "retryforge"
                                                    ? "bg-green-100 text-green-800"
                                                    : recovery.source === "stripe"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {recovery.source === "retryforge"
                                                ? "RetryForge"
                                                : recovery.source === "stripe"
                                                    ? "Stripe"
                                                    : "Manual"}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-10 text-center text-gray-500">
                                No recovered invoices yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
    )
}