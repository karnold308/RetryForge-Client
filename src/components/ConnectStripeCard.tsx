import useAxiosPrivate from '../hooks/useAxiosPrivate'

export default function ConnectStripeCard() {
    const axiosPrivate = useAxiosPrivate()

    const connectStripe = async () => {
        try {
            const resp = await axiosPrivate.get("/api/stripe/connect")
            window.location.href = resp.data.url
        } catch (err) {

        }
    }


    return (
        <>
            <section className="connect-card">
                <div className="connect-content">
                    <div className="connect-badge">
                        Stripe Required
                    </div>
                    <h2>
                        Connect Stripe to begin tracking failed payments
                    </h2>
                    <p>
                        RetryForge automatically monitors failed subscription
                        payments, retries recoverable revenue, and helps reduce
                        involuntary churn.
                    </p>
                    <div className="connect-features">
                        <div className="feature">
                            <h4>Revenue Recovery</h4>
                            <p>
                                Automatically retry failed subscription payments.
                            </p>
                        </div>
                        <div className="feature">
                            <h4>Failure Analytics</h4>
                            <p>
                                Monitor churn trends and payment failures.
                            </p>
                        </div>
                        <div className="feature">
                            <h4>Customer Insights</h4>
                            <p>
                                Identify accounts at risk before cancellation.
                            </p>
                        </div>
                        <div className="feature">
                            <h4>Automated Workflows</h4>
                            <p>
                                Reduce manual billing recovery tasks.
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="connect-btn"
                        onClick={connectStripe}
                    >
                        Connect Stripe
                    </button>

                </div>
                {/* Mock Chart */}
                <div className="connect-visual">
                    <div className="mock-chart">
                        <div className="mock-header">
                            <h3>Recovered Revenue</h3>
                            <div className="pulse" />
                        </div>
                        <div className="bars">
                            <div className="bar bar-1" />
                            <div className="bar bar-2" />
                            <div className="bar bar-3" />
                            <div className="bar bar-4" />
                            <div className="bar bar-5" />
                            <div className="bar bar-6" />
                        </div>
                    </div>
                </div>
            </section>
            {/* Placeholder Cards */}
            <section className="placeholder-grid">
                <div className="placeholder-card">
                    <h3>Recovery Metrics</h3>
                    <div className="skeleton-line medium" />
                    <div className="skeleton-line" />
                    <div className="skeleton-line short" />
                </div>
                <div className="placeholder-card">
                    <h3>Subscription Health</h3>
                    <div className="skeleton-line" />
                    <div className="skeleton-line medium" />
                    <div className="skeleton-line short" />
                </div>
                <div className="placeholder-card">
                    <h3>Recent Activity</h3>
                    <div className="skeleton-line short" />
                    <div className="skeleton-line" />
                    <div className="skeleton-line medium" />
                </div>
            </section>
        </>
    )
}