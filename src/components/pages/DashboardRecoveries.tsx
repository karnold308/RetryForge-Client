import StripeStatusIndicator from '../StripeStatusIndicator'
import { useEffect, useState } from 'react'
import { trackPageView } from '../../utils/analytics'
import { useLocation } from 'react-router-dom'
import { DashboardRecovery } from '../../models/types'
import { getRecoveries, getRecoveryDetails } from '../../api/dashboardApi'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'
import { formatFullStripeCurrency } from '../../utils/formatters'
import '../../styles/DashboardRecoveries.css'

export default function DashboardRecoveries() {
    const { auth } = useAuth()
    const location = useLocation()
    const axiosPrivate = useAxiosPrivate()
    const [recoveries, setRecoveries] = useState<DashboardRecovery[]>([])
    const [loading, setLoading] = useState(true)
    const [
        selectedRecovery,
        setSelectedRecovery
    ] = useState<string | null>(null)

    const [
        recoveryDetail,
        setRecoveryDetail
    ] = useState<any>(null)
    const statusStyles: Record<string, string> = {
        active: "bg-yellow-50 text-yellow-700 border-yellow-200",
        recovered: "bg-emerald-50 text-emerald-700 border-emerald-200",
        failed: "bg-red-50 text-red-700 border-red-200",
    }

    useEffect(() => {
        // Track page view on route change
        const pageTitle = document.title
        trackPageView(location.pathname, pageTitle)
    }, [location])


    useEffect(() => {
        const fetchRecoveries = async () => {
            try {
                const data = await getRecoveries(axiosPrivate)
                setRecoveries(data)
            } catch (err) {
                console.error("Failed to load recoveries", err)
            } finally {
                setLoading(false)
            }
        }

        fetchRecoveries()
    }, [auth?.accessToken])

    const openRecovery = async (
        recoveryId: string
    ) => {

        const data = await getRecoveryDetails(axiosPrivate, recoveryId)

        setRecoveryDetail(data)
        setSelectedRecovery(recoveryId)
    }

    const formatFailure = (reason: string | null) => {
        if (!reason) return "Unknown error"

        if (reason.includes("declined")) return "Card declined"
        if (reason.includes("insufficient")) return "Insufficient funds"
        if (reason.includes("expired")) return "Card expired"

        return reason
    }



    return (
        <>
            <div className="page">
                <div className="page-header grid md:grid-cols-2">
                    <div>
                        <h1>Recoveries</h1>
                        <p>Monitor payment recovery attempts.</p>
                    </div>
                    <StripeStatusIndicator />
                </div>

                <div className="table-card">
                    <table>
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th className="!text-right">Amount</th>
                                <th>Failure</th>
                                <th>Attempts</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7}>Loading...</td>
                                </tr>
                            ) : recoveries.length === 0 ? (
                                <tr>
                                    <td colSpan={7}>
                                        No failed invoices found.
                                    </td>
                                </tr>
                            ) : (
                                recoveries.map(r => (
                                    <tr key={r.id} className="dHighlightRow">
                                        <td>{r.customer}</td>
                                        <td className={`font-medium !text-right ${r.amount > 10000 ? "text-red-600" : "text-gray-900"}`}>{formatFullStripeCurrency(r.amount)}</td>
                                        <td>{formatFailure(r.failureReason)}</td>
                                        <td>{r.attempts}</td>
                                        <td>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusStyles[r.status] ?? "bg-gray-50 text-gray-600 border-gray-200"
                                                }`}>
                                                {r.status}
                                            </span>
                                        </td>
                                        <td>
                                            {r.failedDate
                                                ? new Date(
                                                    r.failedDate
                                                ).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })
                                                : "-"}
                                        </td>
                                        <td>
                                            {r.hostedInvoiceUrl && (
                                                <>
                                                    {/*<a
                                                        className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
                                                        href={r.hostedInvoiceUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        View
                                                    </a>
                                                    */}
                                                    <button
                                                        onClick={() => openRecovery(r.id)}
                                                    >
                                                        Details
                                                    </button>
                                                    <button
                                                        className="text-gray-500 hover:text-gray-700 text-sm"
                                                        onClick={() => console.log("retry", r.id)}
                                                    >
                                                        &nbsp;/&nbsp;Retry
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {recoveryDetail && (
                    <>
                        <div
                            className="drawer-backdrop"
                            onClick={() => {
                                setRecoveryDetail(null)
                                setSelectedRecovery(null)
                            }}
                        />
                        <div className="recovery-drawer">
                            <button className="drawer-close" onClick={() => {
                                    setRecoveryDetail(null)
                                    setSelectedRecovery(null)
                                }}
                            > x </button>
                            <h2>Recovery Details</h2>
                            <div>Customer: {recoveryDetail.customerEmail}</div>
                            <div>Amount: {formatFullStripeCurrency(recoveryDetail.amount)}</div>
                            <div>Failure: {recoveryDetail.failureMessage}</div>
                            <div>Attempts: {recoveryDetail.attemptCount}</div>
                            <div>Recovery Emails: {recoveryDetail.recoveryEmailsSent}</div>
                            <div>Status: {recoveryDetail.status}</div>
                            <div> Failed: {new Date( recoveryDetail.failedAt).toLocaleDateString()}</div>
                            <a className="text-indigo-600 hover:text-indigo-800 font-medium" 
                                href={recoveryDetail.hostedInvoiceUrl} target="_blank" rel="noreferrer">
                                Open Stripe Invoice
                            </a>
                        </div>
                    </>
                )}
            </div></>
    )
}