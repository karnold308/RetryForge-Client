import StripeStatusIndicator from '../StripeStatusIndicator'
import { useEffect } from 'react'
import { trackPageView } from '../../utils/analytics'
import { useLocation } from 'react-router-dom'

export default function DashboardAnalytics() {
    const location = useLocation()
    
    useEffect(() => {
            // Track page view on route change
            const pageTitle = document.title
            trackPageView(location.pathname, pageTitle)
        }, [location]);

    return (
        <>
            <title>RetryForge - Dashboard - Analytics</title>
            <div className="page">
                <div className="page-header grid md:grid-cols-2">
                    <div>
                        <h1>Analytics</h1>
                        <p>Track trends and recovery performance.</p>
                    </div>
                    <StripeStatusIndicator />
                </div>

                <div className="empty-state">
                    <h2>No analytics available yet</h2>
                    <p>
                        Analytics will begin populating after RetryForge
                        detects payment failures and recovery attempts.
                    </p>
                </div>
            </div></>
    )
}