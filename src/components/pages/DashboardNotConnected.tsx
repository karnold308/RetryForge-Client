import '../../styles/Dashboard.css'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

export default function DashboardNotConnected() {
    const axiosPrivate = useAxiosPrivate()
    const connectStripe = async () => {
        try {
            const resp = await axiosPrivate.get("/api/stripe/connect")

            window.location.href = resp.data.url
        } catch (err) {

        }
    }


    return (
        <div className="dashboard">

            {/* Sidebar */}
            <aside className="sidebar ">
                <div className="brand">
                    <img src="/full_logo_with_name_2.png" alt="RetryForge" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="main px-6 pb-16">
                {/* Header */}
                <header className="topbar dashboardNotConn">
                    <div className="topbar-left">
                        <h1>Dashboard</h1>
                        <p>
                            Your revenue recovery workspace
                        </p>
                    </div>
                    <div className="user-pill">
                        Welcome back 👋
                    </div>
                </header>
                {/* Connect Stripe Card */}
                <section className="connect-card pb-24 border-t border-gray-200/70">
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
                        <button onClick={connectStripe}
                            type="button"
                            className="connect-btn"
                        >
                            Connect Stripe
                        </button>
                    </div>
                </section>
                {/* Placeholder Cards */}
                <section className="placeholder-grid pb-24 border-t border-gray-200/70">
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
            </main>
        </div>
    )
}