

export default function FounderPresence() {
    return (
        <>
            <section className="founder-section">
                <div className="founder-container">
                    <div className="founder-card">

                        <img
                            src="/founder.png"
                            alt="Founder of RetryForge"
                            className="founder-avatar"
                        />

                        <div className="founder-name">Kevin Arnold</div>
                        <div className="founder-role">
                            Founder of RetryForge
                        </div>
                        <div className="founder-meta">
                            <div className="founder-meta-item">
                                <div className="founder-meta-icon">↺</div>
                                <div>
                                    <strong>Built specifically for SaaS</strong>
                                    <span>
                                        Focused entirely on failed subscription payment recovery.
                                    </span>
                                </div>
                            </div>

                            <div className="founder-meta-item">
                                <div className="founder-meta-icon">⚡</div>
                                <div>
                                    <strong>Working directly with pilot users</strong>
                                    <span>
                                        Early customers help shape recovery workflows and features.
                                    </span>
                                </div>
                            </div>

                            <div className="founder-meta-item">
                                <div className="founder-meta-icon">✓</div>
                                <div>
                                    <strong>Founder-led support</strong>
                                    <span>
                                        Direct access during onboarding and implementation.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="founder-content">
                        <div className="founder-eyebrow">
                            Built by a founder obsessed with failed payment recovery
                        </div>
                        <h2 className="founder-title">
                            RetryForge exists because SaaS companies quietly lose revenue every month.
                        </h2>
                        <p>
                            I kept seeing subscription businesses lose customers from
                            expired cards, bank declines, and failed retries —
                            even when customers still wanted the product.
                        </p>
                        <p>
                            Stripe provides payment infrastructure, but most teams still lack
                            visibility and control over what happens after a payment fails.
                        </p>
                        <p className="founder-highlight">
                            RetryForge is being built to help SaaS teams recover revenue automatically
                            without adding operational overhead.
                        </p>
                        <div className="founder-quote">
                            <p>
                                <strong>Currently onboarding a small number of pilot users</strong>
                                to help shape the product and recovery workflows.
                            </p>
                        </div>
                        <div className="founder-actions">
                            <a href="/signup" className="nav-btn-primary">
                                Join Early Access
                            </a>
                            <a href="#pricing" className="nav-btn-secondary">
                                View Pilot Pricing
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}