import { SystemStatus } from '../models/types'
import { getTimeAgo } from '../utils/formatters'

interface SystemStatusProps {
    systemStatus: SystemStatus | undefined
}

export default function DashboardOverviewSystemStatus({systemStatus}: SystemStatusProps) {
    return (
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
    )
}