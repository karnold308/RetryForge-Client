import { DashboardOverviewData } from '../models/types'
import { formatStripeCurrency } from '../utils/formatters'

interface RecoveryAttributionProps {
    overview: DashboardOverviewData | undefined
}

export default function DashboardOverviewRecoveryAttribution({ overview }: RecoveryAttributionProps) {
    return (
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
    )
}