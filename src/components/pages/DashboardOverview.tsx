
import StripeStatusIndicator from '../StripeStatusIndicator'
import { trackPageView } from '../../utils/analytics'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import {
    useOverview,
    useRecentRecoveries,
    useSystemStatus,
    useTopOpportunities
} from '../../hooks/dashboard/queries'

import DashboardOverviewHero from '../DashboardOverviewHero'
import DashboardOverviewTopOpportunities from '../DashboardOverviewTopOpportunities'
import DashboardOverviewRecentRecoveries from '../DashboardOverviewRecentRecoveries'
import DashboardOverviewRecoveryAttribution from '../DashboardOverviewRecoveryAttribution'
import DashboardOverviewSystemStatus from '../DashboardOverviewSystemStatus'


export default function DashboardOverview() {
    const location = useLocation()
    const overviewQuery = useOverview()
    const recentRecoveriesQuery = useRecentRecoveries()
    const systemStatusQuery = useSystemStatus()
    const topOpportunitiesQuery = useTopOpportunities()

    const isLoading =
        overviewQuery.isPending ||
        recentRecoveriesQuery.isPending ||
        systemStatusQuery.isPending ||
        topOpportunitiesQuery.isPending


    useEffect(() => {
        // Track page view on route change
        const pageTitle = document.title
        trackPageView(location.pathname, pageTitle)
    }, [location])



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
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {/* hero card */}
                        <DashboardOverviewHero overview={overviewQuery.data}/>
                        {/* top opportunities */}
                        <DashboardOverviewTopOpportunities opportunities={topOpportunitiesQuery.data} />
                        {/* recent recoveries */}
                        <DashboardOverviewRecentRecoveries recentRecoveries={recentRecoveriesQuery.data} />
                    </>
                )}
                {/* recovery attribution */}
                <DashboardOverviewRecoveryAttribution overview={overviewQuery.data} />



                {/* at-risk customers */}
                {/* 
                <DashboardOverviewAtRiskCustomers atRiskCustomers={atRiskCustomers}/>
                */}
                {/* system status */}
                <DashboardOverviewSystemStatus systemStatus={systemStatusQuery.data} />
            </div>
        </>
    )
}