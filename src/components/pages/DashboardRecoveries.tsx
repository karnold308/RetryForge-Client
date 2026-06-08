import StripeStatusIndicator from '../StripeStatusIndicator'
import { useEffect, useState } from 'react'
import { trackPageView } from '../../utils/analytics'
import { useLocation } from 'react-router-dom'
import { DashboardRecovery } from '../../models/types'
import { getRecoveries } from '../../api/dashboardApi'
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
                                    <tr key={r.id} className="dRecoveries">
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
                                                    <a
                                                        className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
                                                        href={r.hostedInvoiceUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        View
                                                    </a>
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
            </div></>
    )
}