import type { MeResponse } from "../models/types"
import "../styles/ConnectedDashboard.css"
import { maskStripeAccountId } from "../utils/maskStripe";

type Props = {
    me: MeResponse;
};

export default function ConnectedDashboard({ me }: Props) {
    const stripe = me?.stripe;

    return (
        <div className="cd-container">
            {/* STRIPE STATUS */}
            <section className="cd-card cd-status-card">
                <div className="cd-status-top">
                    <h2>Stripe Connection</h2>

                    {stripe?.connected ? (
                        <span className="cd-badge success">Connected</span>
                    ) : (
                        <span className="cd-badge warning">Not Connected</span>
                    )}
                </div>

                {stripe?.connected ? (
                    <>
                        <p className="cd-muted">
                            Your Stripe account is successfully connected and syncing.
                        </p>
                        <div className="cd-grid">
                            <div className="cd-stat">
                                <label>Account</label>
                                <span>{maskStripeAccountId(me?.stripe?.stripeAccountId) ?? "—"}</span>
                            </div>
                            <div className="cd-stat">
                                <label>Email</label>
                                <span>{stripe?.stripeEmail ?? ""}</span>
                            </div>
                            <div className="cd-stat">
                                <label>Charges</label>
                                <span>{stripe?.chargesEnabled ? "Enabled" : "Disabled"}</span>
                            </div>
                            <div className="cd-stat">
                                <label>Payouts</label>
                                <span>{stripe?.payoutsEnabled ? "Enabled" : "Disabled"}</span>
                            </div>
                            <div className="cd-stat">
                                <label>Details</label>
                                <span>{stripe?.detailsSubmitted ? "Submitted" : "Pending"}</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="cd-muted">
                        Connect Stripe to begin tracking failed payments and recovery analytics.
                    </p>
                )}
            </section>

            {/* ONBOARDING / NEXT STEPS */}
            <section className="cd-card">
                <h2>What happens next</h2>

                <ul className="cd-list">
                    <li>We sync your Stripe account data</li>
                    <li>We start listening for payment failures</li>
                    <li>Recovery analytics appear after first events</li>
                    <li>You’ll see churn & retry insights in real time</li>
                </ul>
            </section>
            {/* EMPTY STATE ANALYTICS */}
            <section className="cd-grid-cards">
                <div className="cd-card cd-empty">
                    <h3>Failed Payments</h3>
                    <p>No data yet</p>
                </div>
                <div className="cd-card cd-empty">
                    <h3>Recovery Revenue</h3>
                    <p>No data yet</p>
                </div>
                <div className="cd-card cd-empty">
                    <h3>Customer Risk</h3>
                    <p>No data yet</p>
                </div>
            </section>

            {/* ACTIONS */}
            <section className="cd-card cd-actions">
                <h2>Next actions</h2>
                <div className="cd-actions-row">
                    <button className="btn-secondary">
                        Manage Stripe Connection
                    </button>
                    <button className="btn-muted">
                        View Documentation
                    </button>
                </div>
            </section>
        </div>
    );
}