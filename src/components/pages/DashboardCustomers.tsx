import StripeStatusIndicator from '../StripeStatusIndicator'
import { useEffect, useState } from 'react'
import { trackPageView } from '../../utils/analytics'
import { useLocation } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'
import { DashboardCustomer } from '../../models/types'
import { getCustomers } from '../../api/dashboardApi'
import { formatFullStripeCurrency } from '../../utils/formatters'

export default function DashboardCustomers() {
    const { auth } = useAuth()
    const location = useLocation()
    const axiosPrivate = useAxiosPrivate()
    const [customers, setCustomers] = useState<DashboardCustomer[]>([])
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        // Track page view on route change
        const pageTitle = document.title
        trackPageView(location.pathname, pageTitle)
    }, [location])

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getCustomers(axiosPrivate)
                setCustomers(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetch()
    }, [auth?.accessToken])


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
                        {loading ? (
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
                            customers.map(customer => (
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
        </div>
        </>
    )
}
