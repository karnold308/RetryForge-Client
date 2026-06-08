
import StripeStatusIndicator from '../StripeStatusIndicator'
import { trackPageView } from '../../utils/analytics'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { DashboardOverviewData } from '../../models/types'
import { getOverview } from '../../api/dashboardApi'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'
import { formatStripeCurrency } from '../../utils/formatters'


export default function DashboardOverview() {
    const { auth } = useAuth()
    const location = useLocation()
    const axiosPrivate = useAxiosPrivate()
    const [overview, setOverview] =
        useState<DashboardOverviewData | null>(null)

    const [loading, setLoading] =
        useState(true)

    useEffect(() => {
        // Track page view on route change
        const pageTitle = document.title
        trackPageView(location.pathname, pageTitle)
    }, [location])

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                const data = await getOverview(axiosPrivate)
                setOverview(data)
            }
            catch (err) {
                console.error(err)
            }
            finally {
                setLoading(false)
            }
        }

        fetchOverview()
    }, [auth?.accessToken])


    return (
        <>
            <title>RetryForge - Dashboard Overview</title>
            <div className="page">
                <div className="page-header grid md:grid-cols-2">
                    <div>
                        <h1>Overview</h1>
                        <p>Your revenue recovery command center.</p>
                    </div>
                    <StripeStatusIndicator />
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="overview-grid">
                        <div className="stat-card">
                            <h3>Failed Payments</h3>
                            {overview && 0 < overview?.failedPayments ?
                                <span>{overview?.failedPayments}</span>
                                :
                                <>
                                    <span>0</span>
                                    <p>No payment failures detected yet.</p>
                                </>
                            }
                        </div>
                        <div className="stat-card">
                            <h3>Recovered Revenue</h3>
                            <span>${overview?.recoveredRevenue?.toLocaleString() ?? 0}</span>
                            <p>Revenue recovered through RetryForge.</p>
                        </div>
                        <div className="stat-card">
                            <h3>At-Risk Customers</h3>
                            <span>{overview?.atRiskCustomers ?? 0}</span>
                            <p>Customers requiring attention.</p>
                        </div>
                        <div className="stat-card">
                            <h3>Recovery Rate</h3>
                            {overview ?
                                <span>
                                    {overview.recoveryRate.toFixed(1)}%
                                </span>
                                :
                                <>
                                    <span>—</span>
                                    <p>Data will appear after activity.</p>
                                </>
                            }
                        </div>
                        <div className="stat-card">
                            <h3>Revenue At Risk</h3>
                            {overview ?
                                <span>
                                    {'$' + formatStripeCurrency(overview.revenueAtRisk)}
                                </span>
                                :
                                <>
                                    <span>—</span>
                                    <p>Data will appear after activity.</p>
                                </>
                            }
                        </div>
                    </div>
                )}
                <div className="dashboard-card">
                    <h2>System Status</h2>
                    <p>
                        Stripe is connected and RetryForge is monitoring
                        subscription activity.
                    </p>
                </div>
            </div>
        </>
    )
}