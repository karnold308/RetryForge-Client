import { DashboardCustomer } from "../models/types";
import { formatStripeCurrency, getTimeAgo } from "../utils/formatters";


interface AtRiskCustomersProps {
    atRiskCustomers: DashboardCustomer[] | undefined
}

export default function DashboardOverviewAtRiskCustomers({atRiskCustomers}: AtRiskCustomersProps) {
    return (
        <div className="dashboard-card">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold">
                                At-Risk Customers
                            </h2>
                            <p className="text-sm text-gray-500">
                                Customers with active failed payments.
                            </p>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 text-sm font-medium text-gray-500">
                                        Customer
                                    </th>
                                    <th className="text-left py-3 text-sm font-medium text-gray-500">
                                        Active Failures
                                    </th>
                                    <th className="text-left py-3 text-sm font-medium text-gray-500">
                                        Revenue At Risk
                                    </th>
                                    <th className="text-left py-3 text-sm font-medium text-gray-500">
                                        Last Failure
                                    </th>
                                    <th className="text-left py-3 text-sm font-medium text-gray-500">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {atRiskCustomers?.map(customer => (
                                    <tr
                                        key={customer.id}
                                        className="border-b border-gray-100 hover:bg-gray-50"
                                    >
                                        <td className="py-4">
                                            <div>
                                                <div className="font-medium">
                                                    {customer.name || "Unknown"}
                                                </div>

                                                <div className="text-sm text-gray-500">
                                                    {customer.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            {customer.activeFailures}
                                        </td>
                                        <td className="py-4 font-medium">
                                            ${formatStripeCurrency(customer.totalAtRisk)}
                                        </td>
                                        <td className="py-4 text-gray-500">
                                            {null !== customer.lastFailedAt ? getTimeAgo(customer.lastFailedAt) : 'N/A'}
                                        </td>
                                        <td className="py-4">
                                            <span
                                                className="
                                                    inline-flex
                                                    items-center
                                                    rounded-full
                                                    bg-red-100
                                                    px-2.5
                                                    py-1
                                                    text-xs
                                                    font-medium
                                                    text-red-700
                                                "
                                            >
                                                At Risk
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
    )
}