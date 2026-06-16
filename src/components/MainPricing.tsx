
export default function MainPricing() {
    return (
        <section id="pricing" className="pt-[40px] scroll-mt-[120px] pb-24 border-t border-gray-200/70 xs:py-6 xs:pl-4 xs:pr-4">
            <div className="max-w-6xl mx-auto px-6 text-center xs:px-0">
                <div>
                    <h2 className="text-5xl md:text-5xl font-normal text-left mb-2">
                        Simple, performance-based pricing
                    </h2>

                    <p className="text-left pb-4">
                        Start recovering failed payments in minutes.
                        Only pay when revenue is recovered.
                    </p>
                </div>

                <div className="max-w-[460px] text-left ml-auto mr-auto mt-8 bg-white border border-gray-200 rounded-2xl p-10 hover:shadow-lg transition
                    shadow-[0_1px_2px_#0000000a,_0_12px_24px_#0000000f,_0_24px_48px_#0000000a]">
                    <div className="text-[15px] font-semibold text-[#4F46E5] -tracking-[0.2px]">
                        Pilot Pricing
                    </div>
                    { /* 
                    <div className="pricing-price-row">
                        <span className="text-[64px] leading-none font-bold -tracking-[3px] text-gray-900">
                            $49
                        </span>
                        <span className="text-lg text-gray-500">
                            /month
                        </span>
                    </div>
                    <p className="text-[17px] leading-[1.7] text-gray-600">
                        + 5% of recovered revenue.
                    </p>
                    <p>Most customers recover their first failed invoice within days, often covering the cost of our platform.</p>
                    */ }
                    <p className="text-gray-500">Founding pilot customers receive discounted pricing and direct onboarding support while RetryForge is in early access.</p>
                    <ul className="flex flex-col gap-4 py-4 border-t border-gray-100">
                        <li>Automatic retries</li>
                        <li>Send branded card-update emails before subscriptions cancel.</li>
                        <li>Revenue recovery dashboard</li>
                        <li>Stripe integration</li>
                    </ul>

                    <a href="/signup" className="bg-indigo-600 text-white px-5 xs:px-2 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
                        Request Early Access
                    </a>
                </div>
                <p className="text-gray-400 mt-4">
                    Cancel anytime, no long-term contracts, and you only pay when we successfully recover revenue.
                </p>
            </div>
        </section>
    )
}