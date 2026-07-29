
import StripeStatusIndicator from '../StripeStatusIndicator'
import { trackPageView } from '../../utils/analytics'
import { useLocation, useOutletContext, useSearchParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

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
import { MeResponse } from '../../models/types'
import { useHistorySync, useSkipHistorySync } from '../../hooks/dashboard/mutations'


export default function DashboardOverview() {
    const { me } = useOutletContext<{ me: MeResponse | undefined }>()
    const location = useLocation()
    const overviewQuery = useOverview()
    const recentRecoveriesQuery = useRecentRecoveries()
    const systemStatusQuery = useSystemStatus()
    const topOpportunitiesQuery = useTopOpportunities()
    const historySyncStatus = me?.stripe?.historySyncStatus ?? 'queued'
    const { mutate: retryHistorySync, isPending } = useHistorySync()
    const [searchParams] = useSearchParams()
    const { mutate: skipHistorySync } = useSkipHistorySync()
    const didRefresh = useRef(false)

    const [pageMessage, setPageMessage] = useState<{
        type: "success" | "error"
        text: string
    } | null>(null)

    useEffect(() => {
        if (
            historySyncStatus === "complete" &&
            !didRefresh.current
        ) {
            didRefresh.current = true

            overviewQuery.refetch()
            recentRecoveriesQuery.refetch()
            systemStatusQuery.refetch()
            topOpportunitiesQuery.refetch()
        }
    }, [historySyncStatus])

    useEffect(() => {
        const stripeConnect = searchParams.get("stripe")
        if (!stripeConnect) {
            return
        }

        switch (stripeConnect) {
            case 'expired':
                setPageMessage({
                    type: "error",
                    text: "Your Stripe connection session expired. Please click Connect Stripe again."
                })

                searchParams.delete("stripe")
                window.history.replaceState({}, "", "/dashboard")
                break
            case 'error':
                setPageMessage({
                    type: "error",
                    text: "There was an error connecting your Stripe account. Please click Connect Stripe again or email support"
                })

                searchParams.delete("stripe")
                window.history.replaceState({}, "", "/dashboard")
                break
        }
    }, [])

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
                {pageMessage && (
                    <div className="errmsg">
                        <p>
                            {pageMessage.text}
                        </p>
                    </div>
                )}
                {'queued' === historySyncStatus ?
                    <>
                        <div className="card p-8 text-center">
                            <div className="text-4xl mb-4">⏳</div>
                            <h2 className="text-xl font-semibold mb-2">
                                Preparing your account
                            </h2>
                            <p className="text-gray-600">
                                We're getting everything ready before importing your Stripe history.
                            </p>
                        </div>
                    </>
                    : ('processing' === historySyncStatus ?
                        <>
                            <div className="card p-8 max-w-2xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                    <h2 className="text-xl font-semibold">
                                        Stripe Connected
                                    </h2>
                                </div>
                                <div className="border rounded-xl p-6 bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        <div className="h-3 w-3 shrink-0 rounded-full bg-blue-600 animate-pulse" />
                                        <div>
                                            <h3 className="font-semibold text-lg">
                                                Importing your Stripe history...
                                            </h3>
                                            <p className="text-gray-600 mt-1">
                                                We're finding previous failed payments and preparing your dashboard.
                                            </p>
                                            <p className="text-sm text-gray-500 mt-4">
                                                This usually takes less than a minute.
                                                You can safely leave this page—we'll continue in the background.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* todo: put spinner here */}
                        </>
                        : (isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            ('complete' === historySyncStatus || 'skipped' === historySyncStatus) ?
                                <>
                                    {/* hero card */}
                                    <DashboardOverviewHero overview={overviewQuery.data} />
                                    {/* top opportunities */}
                                    <DashboardOverviewTopOpportunities opportunities={topOpportunitiesQuery.data} />
                                    {/* recent recoveries */}
                                    <DashboardOverviewRecentRecoveries recentRecoveries={recentRecoveriesQuery.data} />
                                    {/* at-risk customers */}
                                    {/* 
                                    <DashboardOverviewAtRiskCustomers atRiskCustomers={atRiskCustomers}/>
                                    */}
                                    {/* recovery attribution */}
                                    <DashboardOverviewRecoveryAttribution overview={overviewQuery.data} />
                                    {/* system status */}
                                    <DashboardOverviewSystemStatus systemStatus={systemStatusQuery.data} />
                                </>
                                : 'failed' === historySyncStatus ?
                                    <>
                                        <div className="card border border-red-200 bg-red-50 p-8 max-w-2xl">
                                            <div className="text-4xl mb-4">
                                                ⚠️
                                            </div>
                                            <h2 className="text-xl font-semibold mb-3">
                                                History import couldn't be completed
                                            </h2>
                                            <p className="text-gray-700 mb-6">
                                                RetryForge couldn't import your previous failed Stripe payments.
                                                No data has been lost—you can try again.
                                            </p>
                                            <p className="text-gray-700 mb-6">
                                                This won't affect future recoveries.
                                                RetryForge will still monitor all new failed payments going forward.
                                            </p>
                                            <button
                                                className="border border-gray-300 px-5 py-3 rounded-xl font-semibold hover:bg-white"
                                                onClick={() => retryHistorySync()}
                                            >
                                                {isPending ? "Retrying..." : "Retry Import"}
                                            </button>
                                            <br></br><br></br>
                                            <button
                                                className="border border-gray-300 px-5 py-3 rounded-xl font-semibold hover:bg-white"
                                                onClick={() => skipHistorySync()}
                                            >
                                                Skip Import
                                            </button>

                                        </div>

                                    </>
                                    :
                                    <>
                                        <p>something went very wrong</p>
                                    </>
                        )))}






            </div>
        </>
    )
}