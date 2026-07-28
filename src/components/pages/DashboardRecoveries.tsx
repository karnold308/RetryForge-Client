import StripeStatusIndicator from '../StripeStatusIndicator'
import { useEffect, useState } from 'react'
import { trackPageView } from '../../utils/analytics'
import { useLocation, useOutletContext } from 'react-router-dom'
import { formatFullStripeCurrency, formatFailure } from '../../utils/formatters'
import '../../styles/DashboardRecoveries.css'
import { useRecoveries, useRecoveryDetails } from '../../hooks/dashboard/queries'
import { DashboardRecovery, MeResponse } from '../../models/types'
import { useRetryRecovery } from '../../hooks/dashboard/mutations'


export default function DashboardRecoveries() {
    const { me } = useOutletContext<{ me: MeResponse | undefined }>()
    const location = useLocation()
    const [selectedRecoveryId, setSelectedRecoveryId] = useState<string | null>(null)
    const recoveriesQuery = useRecoveries()
    const recoveryDetailsQuery = useRecoveryDetails(selectedRecoveryId)
    const isLoading = recoveriesQuery.isPending
    const recoveries = recoveriesQuery.data ?? []
    const recoveryDetails = recoveryDetailsQuery.data

    const [retryingId, setRetryingId] = useState<string | null>(null)
    const retryMutation = useRetryRecovery()


    const statusStyles: Record<string, string> = {
        active: "bg-yellow-50 text-yellow-700 border-yellow-200",
        recovered: "bg-emerald-50 text-emerald-700 border-emerald-200",
        failed: "bg-red-50 text-red-700 border-red-200",
    }


    const handleRowClick = (id: string) => {
        setSelectedRecoveryId(id)
    }

    const handleRetry = async (id: string) => {
        try {
            setRetryingId(id)
            await retryMutation.mutateAsync(id)
        }
        catch (err) {
            console.error(err)
        }
        finally {
            setRetryingId(null)
        }
    }

    useEffect(() => {
        // Track page view on route change
        const pageTitle = document.title
        trackPageView(location.pathname, pageTitle)
    }, [location])



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
                            {isLoading ? (
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
                                recoveries.map((r: DashboardRecovery) => (
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
                                                        onClick={() => handleRowClick(r.id)}
                                                    >
                                                        Details
                                                    </button>
                                                    <button
                                                        className="text-gray-500 hover:text-gray-700 text-sm"
                                                        onClick={() => handleRetry(r.id)}
                                                        disabled={retryingId === r.id}
                                                    >
                                                        {'recovered' !== r.status ? 
                                                            (retryingId === r.id ? "\u00A0/\u00A0Retrying..." : "\u00A0/\u00A0Retry")
                                                            : '' }
                                                        
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
                {/*
                {recoveryDetailsQuery.isPending && (
                    <Spinner />
                )}

                {recoveryDetailsQuery.isError && (
                    <ErrorCard />
                )}
                */}
                {selectedRecoveryId && (
                    <>
                        <div
                            className="drawer-backdrop"
                            onClick={() => setSelectedRecoveryId(null)}
                        />

                        <div className="recovery-drawer">
                            <button
                                className="drawer-close"
                                onClick={() => setSelectedRecoveryId(null)}
                            >
                                ×
                            </button>

                            <h2>Recovery Details</h2>

                            {recoveryDetailsQuery.isPending ? (
                                <p>Loading...</p>
                            ) : recoveryDetailsQuery.isError ? (
                                <p>Unable to load recovery details.</p>
                            ) : recoveryDetails ? (
                                <>
                                    <div>Customer: {recoveryDetails.customerEmail}</div>
                                    <div>Amount: {formatFullStripeCurrency(recoveryDetails.amount)}</div>
                                    <div>Failure: {recoveryDetails.failureMessage}</div>
                                    <div>Attempts: {recoveryDetails.attemptCount}</div>
                                    <div>Recovery Emails: {recoveryDetails.recoveryEmailsSent}</div>
                                    <div>Status: {recoveryDetails.status}</div>
                                    <div>
                                        Failed: {new Date(recoveryDetails.failedAt).toLocaleDateString()}
                                    </div>

                                    <a
                                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                                        href={recoveryDetails.hostedInvoiceUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Open Stripe Invoice
                                    </a>
                                </>
                            ) : null}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}