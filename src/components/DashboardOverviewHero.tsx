import { DashboardOverviewData } from '../models/types'
import { formatFullStripeCurrency } from '../utils/formatters'

interface OverviewHeroProps {
    overview: DashboardOverviewData | undefined
}

export default function DashboardOverviewHero({ overview }: OverviewHeroProps) {
    return (
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
    )
}