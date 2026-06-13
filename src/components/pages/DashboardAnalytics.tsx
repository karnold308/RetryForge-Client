import StripeStatusIndicator from '../StripeStatusIndicator'
import { useEffect, useState } from 'react'
import { trackPageView } from '../../utils/analytics'
import { useLocation } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'
import { DashboardAnalyticsFields } from '../../models/types'
import { getAnalytics } from '../../api/dashboardApi'
import { formatFullStripeCurrency } from '../../utils/formatters'

export default function DashboardAnalytics() {
    const { auth } = useAuth()
    const location = useLocation()
    const axiosPrivate = useAxiosPrivate()
    const [analytics, setAnalytics] = useState<DashboardAnalyticsFields | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Track page view on route change
        const pageTitle = document.title
        trackPageView(location.pathname, pageTitle)
    }, [location])


    useEffect(() => {

        const load = async () => {
            try {
                const res = await getAnalytics(axiosPrivate)
                setAnalytics(res)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [auth?.accessToken])

    const formatFailure = (reason: string | null) => {
        if (!reason) return "Unknown error"

        if (reason.includes("declined")) return "Card declined"
        if (reason.includes("insufficient")) return "Insufficient funds"
        if (reason.includes("expired")) return "Card expired"

        return reason
    }

    if (loading) {
        return <div>Loading...</div>
    }



    return (
        <>
            <title>RetryForge - Dashboard - Analytics</title>
            {analytics ? (
                <div className="page">
                    <div className="page-header grid md:grid-cols-2">
                        <div>
                            <h1>Analytics</h1>
                            <p>Revenue recovery insights.</p>
                        </div>
                        <StripeStatusIndicator />
                    </div>
                    <div className="overview-grid">
                        <div className="stat-card">
                            <h3>Total Failures</h3>
                            <span>{analytics.totalFailures}</span>
                        </div>
                        <div className="stat-card">
                            <h3>Recovered Revenue</h3>
                            <span>{formatFullStripeCurrency(analytics.recoveredRevenue)}</span>
                        </div>
                        <div className="stat-card">
                            <h3>Revenue At Risk</h3>
                            <span>{formatFullStripeCurrency(analytics.revenueAtRisk)}</span>
                        </div>
                        <div className="stat-card">
                            <h3>Recovery Rate</h3>
                            <span>{analytics.recoveryRate}%</span>
                        </div>
                    </div>
                    <div className="dashboard-card">
                        <h2>Failure Reasons</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Reason</th>
                                    <th>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analytics.failureReasons
                                    .map((reason: any) => (
                                        <tr key={reason.failure_code}>
                                            <td>{formatFailure(reason.failure_code)}:&nbsp;</td>
                                            <td>{reason.count}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="dashboard-card">
                        <h2>Recovery Funnel</h2>
                        <div className="funnel-grid">
                            <div>
                                Failed&nbsp;
                                <strong>{analytics.totalFailures}</strong>
                            </div>
                            <div>
                                Active&nbsp;
                                <strong>{analytics.activeRecoveries}</strong>
                            </div>
                            <div>
                                Recovered&nbsp;
                                <strong>{analytics.recoveredCases}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>
            }
        </>
    )
}