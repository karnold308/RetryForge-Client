
export default function Problem() {
    return (
        <section className="problem pb-24 py-20 border-t xs:py-12 xs:pl-4 xs:pr-4 border-gray-200/70">
            <div className="max-w-6xl mx-auto grid">
                <h2 className="text-[56px] md:text-[56px] xs:text-4xl xs:tracking-tighter leading-tight tracking-tight font-normal text-center mb-6 text-left">
                    Failed payments are silently killing your revenue
                </h2>
                <p>
                    Most SaaS companies lose 5-15% of revenue due to failed payments—and never recover most of it.
                </p>
                <div className="grid xs:grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
                        <span>💳</span><h3>Expired cards</h3>
                        <p>Customers don't update payment details in time.</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
                        <span>🏦</span><h3>Bank declines</h3>
                        <p>Legitimate payments get rejected unexpectedly.</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
                        <span>⏱️</span><h3>Poor retry timing</h3>
                        <p>Default retries miss optimal recovery windows.</p>
                    </div>
                </div>
                <p className="xs:mt-8">
                    Failed payments are one of the highest-ROI revenue problems in SaaS — because the customer already intended to pay.
                    8% fail rate. 30% recoverable.
                </p>
            </div>
        </section>
    )
}