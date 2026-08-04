import { useState } from 'react'
import { useRetryRecovery } from '../hooks/dashboard/mutations'
import { TopOpportunities } from '../models/types'
import { formatStripeCurrency } from '../utils/formatters'

interface TopOpportunitiesProps {
    opportunities: TopOpportunities[] | undefined
}

export default function DashboardOverviewTopOpportunities({ opportunities }: TopOpportunitiesProps) {
    const [retryingId, setRetryingId] = useState<string | null>(null)
    const retryMutation = useRetryRecovery()

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
    return (
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
                {opportunities?.map((c: TopOpportunities, index: number) => (
                    <div
                        key={c.id}
                        className="
                            flex
                            flex-col
                            gap-4
                            p-4
                            border
                            rounded-lg
                            hover:bg-gray-50
                            transition
                            md:grid
                            md:grid-cols-[minmax(0,1fr)_150px_110px]
                            md:items-center"
                    >
                        <div className="flex items-center gap-4 min-w-0">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white text-sm flex-shrink-0">
                                {index + 1}
                            </div>
                            <div className="min-w-0">
                                <div className="font-medium truncate">
                                    {c.name || "Unknown"}
                                </div>
                                <div className="text-sm text-gray-500 truncate">
                                    {c.email}
                                </div>
                            </div>
                        </div>
                        <div className="text-left md:text-right">
                            <div className="font-semibold">
                                ${formatStripeCurrency(c.totalAtRisk)}
                            </div>
                            <div className="text-xs text-gray-500">
                                {c.activeFailures} failures • Score {c.score.toFixed(0)}
                            </div>
                        </div>
                        <button
                            onClick={() => handleRetry(c.topCaseId)}
                            disabled={retryingId === c.topCaseId}
                            className="justify-self-end
                                    px-3
                                    py-1
                                    text-xs
                                    bg-black
                                    text-white
                                    rounded
                                    disabled:opacity-50
                                    md:w-auto
                                    md:justify-self-end"
                        >
                            {retryingId === c.topCaseId ? "Retrying..." : "Retry Now"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}