

export default function Hero() {
    return (
        <section className="bg-gray-50 py-24 xs:py-6 xs:pl-4 xs:pr-4 hero pb-24 border-t border-gray-200/70
            bg-[radial-gradient(circle_at_top,#6366f10f,#0000_50%)]">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* left column */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        {/* <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold">
                            RF
                        </div>*/}
                        <span className="text-xl font-semibold text-gray-900">
                            {/* RetryForge */}
                            <img alt="RetryForge logo" className="mix-blend-multiply h-10 w-[200px] h-[90px]" src="/full_logo_with_name_2.png" />
                        </span>

                    </div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-sm mb-4">
                        Early Access • Looking for pilot Stripe SaaS companies
                    </div>

                    {/* Headline */}
                    <h1 className="text-[42px] md:text-[42px] font-semibold tracking-tight text-gray-900 leading-tight mb-5">
                        Recover subscription revenue Stripe leaves behind
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg text-gray-600 mb-8 max-w-lg">
                         { /* Recover failed Stripe payments automatically before subscriptions churn. */ }
                         RetryForge is building smarter failed-payment recovery for Stripe SaaS companies. Join the pilot program and help shape the platform. We are currently onboarding 5-10 pilot Stripe SaaS companies.
                    </p>

                    {/* CTA */}
                    <div className="flex gap-4">
                        {/*
                        <Link to="/demo" className="border border-gray-300 px-5 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">Book a Demo</Link> 
                        */ }
                        <a href="#calculator" className="px-5 py-3 rounded-xl border border-gray-300 font-semibold hover:bg-gray-100 transition">See How Much You're Losing</a>
                    </div>
                    <div className="mt-6 flex items-center text-sm text-gray-600">
                        {/* 
                        <div className="hero-trust-item">
                            <span className="hero-trust-dot"></span>
                            Works with Stripe Billing
                        </div>

                        <div className="hero-trust-item">
                            <span className="hero-trust-dot"></span>
                            Setup in minutes
                        </div>

                        <div className="hero-trust-item">
                            <span className="hero-trust-dot"></span>
                            No billing migration required
                        </div>
                        */ }
                        <div className="text-gray-600 backdrop-blur-md bg-white/70 border border-gray-200 rounded-full items-center gap-2 p-2 font-medium flex">
                            <span>Founder-led pilot program for SaaS companies using Stripe Billing</span>
                        </div>
                    </div>
                </div>

                {/* right column */}
                <div className="relative">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-4">
                        <img
                            src="/dashboard_mockup.png"
                            alt="RetryForge dashboard showing recovered revenue analytics"
                            className="rounded-lg"
                        />
                    </div>

                    {/* Floating badge */}
                    <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
                        Example Recovery Dashboard
                    </div>
                </div>

            </div>
        </section>
    );
}

