
import StripeStatusIndicator from '../StripeStatusIndicator'
import { trackPageView } from '../../utils/analytics'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { DashboardOverviewData } from '../../models/types'
import { getOverview } from '../../api/dashboardApi'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'
import { formatFullStripeCurrency, formatStripeCurrency } from '../../utils/formatters'


export default function DashboardOverview() {
    const { auth } = useAuth()
    const location = useLocation()
    const axiosPrivate = useAxiosPrivate()
    const [overview, setOverview] = useState<DashboardOverviewData | null>(null)

    const [loading, setLoading] = useState(true)

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
                    <>
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
                                        currently at risk across{' '}
                                        <strong>
                                            {overview?.activeRecoveries ?? 0}
                                        </strong>{' '}
                                        active recovery cases.
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
                                <div className="rounded-xl border border-gray-200 p-5">
                                    <p className="text-sm text-gray-500">
                                        Total Recovery Cases
                                    </p>
                                    <p className="text-5xl font-bold mt-2">
                                        {overview?.totalFailedPayments ?? 0}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-3">
                                        Historical failed invoices monitored by RetryForge.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="overview-grid">
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
                                <h3>Total Recovery Cases</h3>
                                {overview && 0 < overview?.totalFailedPayments ?
                                    <span>{overview?.totalFailedPayments}</span>
                                    :
                                    <>
                                        <span>0</span>
                                        <p>No payment failures detected yet.</p>
                                    </>
                                }
                            </div>
                            <div className="stat-card">
                                <h3>Active Recoveries</h3>
                                {overview && 0 < overview?.activeRecoveries ?
                                    <span>{overview?.activeRecoveries}</span>
                                    :
                                    <>
                                        <span>0</span>
                                        <p>No recoveries initiated yet.</p>
                                    </>
                                }
                            </div>
                            <div className="stat-card">
                                <h3>At-Risk Customers</h3>
                                <span>{overview?.atRiskCustomers ?? 0}</span>
                                <p>Customers requiring attention.</p>
                            </div>
                            <div className="stat-card">
                                <h3>Average Recovery Time</h3>
                                <span>{overview?.averageRecoveryTime ?? 0} hours</span>
                                <p>Duration to recover an invoice.</p>
                            </div>
                        </div>
                        <div className="dashboard-card mb-6">
                            <h2 className="mb-6">
                                Recovery Attribution
                            </h2>
                            <div className="space-y-5">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span>RetryForge</span>
                                        <span>
                                            {overview?.retryForgePercent.toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-black"
                                            style={{
                                                width: `${overview?.retryForgePercent ?? 0}%`
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {overview?.retryForgeRecoveries ?? 0} recovered invoices
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
                                        {overview?.stripeRecoveries ?? 0} recovered invoices
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
                                        {overview?.manualRecoveries ?? 0} recovered invoices
                                    </p>
                                </div>

                            </div>
                        </div>
                    </>
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