
import StripeStatusIndicator from '../StripeStatusIndicator'
import { trackPageView } from '../../utils/analytics'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function DashboardOverview() {
const location = useLocation()

    useEffect(() => {
            // Track page view on route change
            const pageTitle = document.title
            trackPageView(location.pathname, pageTitle)
        }, [location]);

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

                <div className="overview-grid">
                    <div className="stat-card">
                        <h3>Failed Payments</h3>
                        <span>0</span>
                        <p>No payment failures detected yet.</p>
                    </div>

                    <div className="stat-card">
                        <h3>Recovered Revenue</h3>
                        <span>$0</span>
                        <p>Revenue recovered through RetryForge.</p>
                    </div>

                    <div className="stat-card">
                        <h3>At-Risk Customers</h3>
                        <span>0</span>
                        <p>Customers requiring attention.</p>
                    </div>

                    <div className="stat-card">
                        <h3>Recovery Rate</h3>
                        <span>—</span>
                        <p>Data will appear after activity.</p>
                    </div>
                </div>

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