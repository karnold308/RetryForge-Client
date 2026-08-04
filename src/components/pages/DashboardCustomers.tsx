import StripeStatusIndicator from '../StripeStatusIndicator'
import { useEffect } from 'react'
import { trackPageView } from '../../utils/analytics'
import { useLocation } from 'react-router-dom'
import { DashboardCustomer } from '../../models/types'
import { formatFullStripeCurrency } from '../../utils/formatters'
import { useCustomers } from '../../hooks/dashboard/queries'


export default function DashboardCustomers() {
    const location = useLocation()
    const customersQuery = useCustomers()
    const isLoading = customersQuery.isPending
    const customers = customersQuery.data

    useEffect(() => {
        // Track page view on route change
        const pageTitle = document.title
        trackPageView(location.pathname, pageTitle)
    }, [location])

    return (
        <>
            <title>RetryForge - Dashboard - Customers</title>
            <div className="page">

                <div className="page-header grid md:grid-cols-2">
                    <div>
                        <h1>Customers</h1>
                        <p>
                            View customers with payment
                            recovery activity.
                        </p>
                    </div>
                    <StripeStatusIndicator />
                </div>
                <div className="table-card">
                    <div className="hidden md:block table-card">
                        <table>
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th className="!text-center">Active Failures</th>
                                    <th className="!text-right">At Risk</th>
                                    <th className="!text-right">Recovered</th>
                                    <th className="!text-center">Last Failed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5}>
                                            Loading...
                                        </td>
                                    </tr>
                                ) : customers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5}>
                                            No customers found.
                                        </td>
                                    </tr>
                                ) : (
                                    customers.map((customer: DashboardCustomer) => (
                                        <tr key={customer.id} className="dHighlightRow">
                                            <td>
                                                <div>
                                                    <strong>
                                                        {
                                                            customer.email ||
                                                            customer.name ||
                                                            customer.stripeCustomerId
                                                        }
                                                    </strong>
                                                    <div
                                                        style={{
                                                            fontSize: '.85rem',
                                                            opacity: .7
                                                        }}
                                                    >
                                                        {
                                                            customer.stripeCustomerId
                                                        }
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="!text-center">{customer.activeFailures}</td>
                                            <td className="!text-right">{formatFullStripeCurrency(customer.totalAtRisk)}</td>
                                            <td className="!text-right">{formatFullStripeCurrency(customer.recoveredRevenue)}</td>
                                            <td className="!text-center">
                                                {customer.lastFailedAt
                                                    ? new Date(
                                                        customer.lastFailedAt
                                                    ).toLocaleDateString()
                                                    : '-'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="md:hidden space-y-3">
                        <div className="md:hidden space-y-3">
                            {isLoading ? (
                                <div className="rounded-lg border p-4 text-center">
                                    Loading...
                                </div>
                            ) : customers.length === 0 ? (
                                <div className="rounded-lg border p-4 text-center text-gray-500">
                                    No customers found.
                                </div>
                            ) : (
                                customers.map((customer: DashboardCustomer) => (
                                    <div key={customer.id} className="rounded-lg border bg-white p-4 shadow-sm">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="min-w-0">
                                                <div className="font-medium truncate">
                                                    {customer.email ||
                                                        customer.name ||
                                                        customer.stripeCustomerId}
                                                </div>
                                                <div className="text-xs text-gray-500 truncate mt-1">
                                                    {customer.stripeCustomerId}
                                                </div>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <div className="text-xs text-gray-500">
                                                    Active
                                                </div>

                                                <div className="font-semibold">
                                                    {customer.activeFailures}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase">
                                                    At Risk
                                                </div>
                                                <div className="font-medium">
                                                    {formatFullStripeCurrency(customer.totalAtRisk)}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-gray-500 uppercase">
                                                    Recovered
                                                </div>
                                                <div className="font-medium text-green-600">
                                                    {formatFullStripeCurrency(customer.recoveredRevenue)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 text-sm text-gray-500">
                                            Last Failed:&nbsp;
                                            {customer.lastFailedAt
                                                ? new Date(customer.lastFailedAt).toLocaleDateString()
                                                : "-"}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
