
import StripeStatusIndicator from '../StripeStatusIndicator'
import { trackPageView } from '../../utils/analytics'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
    AtRiskCustomers, DashboardOverviewData, DashboardRecentRecovery,
    SystemStatus, TopOpportunities
} from '../../models/types'
import { getAtRiskCustomers, getOverview, getRecentRecoveries, getSystemStatus, getTopOpportunities, retryRecovery } from '../../api/dashboardApi'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'
import {
    formatFullStripeCurrency, formatStripeCurrency,
    formatFailure, getTimeAgo
} from '../../utils/formatters'


export default function DashboardOverview() {
    const { auth } = useAuth()
    const location = useLocation()
    const axiosPrivate = useAxiosPrivate()
    const [loading, setLoading] = useState(true)
    const [overview, setOverview] = useState<DashboardOverviewData | null>(null)
    const [recentRecoveries, setRecentRecoveries] = useState<DashboardRecentRecovery[] | null>(null)
    const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null)
    // const [atRiskCustomers, setAtRiskCustomers] = useState<AtRiskCustomers[] | null>(null)
    const [topOpportunities, setTopOpportunities] = useState<TopOpportunities[] | null>(null)
    const [retrying, setRetrying] = useState<string | null>(null)

    useEffect(() => {
        // Track page view on route change
        const pageTitle = document.title
        trackPageView(location.pathname, pageTitle)
    }, [location])

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [
                    overviewData,
                    recentRecoveriesData,
                    systemStatusData,
                    // atRiskCustomersData,
                    topOpportunitiesData
                ] = await Promise.all([
                    getOverview(axiosPrivate),
                    getRecentRecoveries(axiosPrivate),
                    getSystemStatus(axiosPrivate),
                    // getAtRiskCustomers(axiosPrivate),
                    getTopOpportunities(axiosPrivate)
                ])

                setOverview(overviewData)
                setRecentRecoveries(recentRecoveriesData)
                setSystemStatus(systemStatusData)
                // setAtRiskCustomers(atRiskCustomersData)
                setTopOpportunities(topOpportunitiesData)
            }
            catch (err) {
                console.error(err)
            }
            finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [auth?.accessToken])

    const handleRetry = async (id: string) => {
        try {
            setRetrying(id)

            await retryRecovery(axiosPrivate, id)

            const [
                overviewData,
                recentRecoveriesData,
                topOpportunitiesData
            ] = await Promise.all([
                getOverview(axiosPrivate),
                getRecentRecoveries(axiosPrivate),
                getTopOpportunities(axiosPrivate)
            ])

            setOverview(overviewData)
            setTopOpportunities(topOpportunitiesData)
            setRecentRecoveries(recentRecoveriesData)

        } catch (err) {
            console.error(err)
        } finally {
            setRetrying(null)
        }
    }


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
                    <>
                        {/* hero card */}
                        <div className="dashboard-card overflow-hidden mb-6">
                            <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-center">
                                <div>
                                    <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
                                        Revenue Recovery Overview
                                    </p>
                                    <h2 className="text-4xl font-bold mb-3">
                                        {formatFullStripeCurrency(
                                            overview?.revenueAtRisk ?? 0
                                        )}
                                    </h2>
                                    <p className="text-lg text-gray-600">
                                        Revenue currently exposed to failed subscription payments.
                                    </p>
                                    <div className="flex flex-wrap gap-6 mt-6">
                                        <div>
                                            <p className="text-xs uppercase text-gray-500">
                                                Recovered Revenue
                                            </p>
                                            <p className="text-xl font-semibold">
                                                {formatFullStripeCurrency(
                                                    overview?.recoveredRevenue ?? 0
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase text-gray-500">
                                                Recovery Rate
                                            </p>
                                            <p className="text-xl font-semibold">
                                                {overview?.recoveryRate.toFixed(1)}%
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase text-gray-500">
                                                Avg Recovery Time
                                            </p>
                                            <p className="text-xl font-semibold">
                                                {overview?.averageRecoveryTime ?? '—'} hrs
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* top opportunities */}
                        <div className="dashboard-card mb-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        Top Recovery Opportunities
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Customers most likely to recover revenue right now.
                                    </p>
                                </div>
                                <span className="text-xs bg-black text-white px-3 py-1 rounded-full">
                                    Live Priority Queue
                                </span>
                            </div>
                            <div className="space-y-3">
                                {topOpportunities?.map((c, index) => (
                                    <div
                                        key={c.id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white text-sm">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <div className="font-medium">
                                                    {c.name || "Unknown"}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {c.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold">
                                                ${formatStripeCurrency(c.totalAtRisk)}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {c.activeFailures} failures •
                                                Score {c.score.toFixed(0)}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRetry(c.topCaseId)}
                                            disabled={retrying === c.topCaseId}
                                            className="px-3 py-1 text-xs bg-black text-white rounded disabled:opacity-50"
                                        >
                                            {retrying === c.topCaseId ? "Retrying..." : "Retry Now"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* recent recoveries */}
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
                                            recentRecoveries.map((recovery) => (
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
                        </div>
                    </>
                )}
                {/* recovery attribution */}
                <div className="dashboard-card mb-6">
                    <h2 className="mb-6">
                        Recovery Attribution
                    </h2>
                    <div className="space-y-5">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>RetryForge Automatic</span>
                                <span>
                                    {overview?.retryForgeAutoPercent.toFixed(1)}%
                                </span>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-black"
                                    style={{ width: `${overview?.retryForgeAutoPercent ?? 0}%` }}
                                />
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                ${formatStripeCurrency(overview?.retryForgeAutoRevenue) ?? 0} recovered
                            </p>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>Stripe Smart Retries</span>
                                <span>
                                    {overview?.stripePercent.toFixed(1)}%
                                </span>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-black"
                                    style={{
                                        width: `${overview?.stripePercent ?? 0}%`
                                    }}
                                />
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                ${formatStripeCurrency(overview?.stripeRevenue) ?? 0} recovered
                            </p>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>RetryForge Manual</span>
                                <span>
                                    {overview?.retryForgeManualPercent.toFixed(1)}%
                                </span>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-black"
                                    style={{ width: `${overview?.retryForgeManualPercent ?? 0}%` }}
                                />
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                ${formatStripeCurrency(overview?.retryForgeManualRevenue) ?? 0} recovered
                            </p>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>Manual Recovery</span>
                                <span>
                                    {overview?.manualPercent}%
                                </span>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-black"
                                    style={{
                                        width: `${overview?.manualPercent ?? 0}%`
                                    }}
                                />
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                ${formatStripeCurrency(overview?.manualRevenue) ?? 0} recovered
                            </p>
                        </div>

                    </div>
                </div>



                {/* at-risk customers */}
                {/* 
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
                                            {getTimeAgo(customer.lastFailedAt)}
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
                */}
                <div className="dashboard-card">
                    <h2 className="font-bold">System Status</h2>
                    <p>
                        {systemStatus && systemStatus?.stripeConnected ?
                            <span>
                                <span className="text-green-500 font-bold">✓</span> Stripe is connected and RetryForge is monitoring
                                subscription activity.
                            </span>
                            : ''}

                    </p>
                    <p>
                        {systemStatus && systemStatus?.webhookHealthy ?
                            <>
                                <span>
                                    <span className="text-green-500 font-bold">✓</span> Webhooks healthy.
                                </span>
                                <br></br>
                                <span>Last event: {getTimeAgo(systemStatus.lastWebhookAt)}</span>
                                <br></br><span>&nbsp;</span>
                            </>
                            : <span>❌ There is an issue with the webhook listener. Check back in a day. If problem persists, email
                                <a
                                    href="mailto:support@retryforge.com"
                                    className="text-indigo-600"
                                >
                                    &nbsp;support@retryforge.com
                                </a>
                                &nbsp;and include your account info.
                            </span>
                        }
                    </p>
                    <p>
                        {systemStatus && systemStatus?.schedulerHealthy ?
                            <>
                                <span>
                                    <span className="text-green-500 font-bold">✓</span> Scheduler running.
                                </span>
                                <br></br>
                                <span>Last job: {getTimeAgo(systemStatus.lastJobRun)}</span>
                            </>
                            : <span>❌ There is an issue with the job scheduler. Check back in an hour. If problem persists, email
                                <a href="mailto:support@retryforge.com" className="text-indigo-600">
                                    &nbsp;support@retryforge.com
                                </a>
                                &nbsp;and include your account info.
                            </span>
                        }
                    </p>
                </div>
            </div>
        </>
    )
}