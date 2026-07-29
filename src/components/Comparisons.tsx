
export default function Comparisons() {
    return (
        <section className="px-8 py-20 grid pb-24 border-t border-gray-200/70 xs:py-6 xs:pl-4 xs:pr-4">
            <div className="max-w-6xl mx-auto px-6 grid xs:px-2">
                <div>
                    <h2 className="text-5xl md:text-5xl font-normal text-center mb-2">Why not just use Stripe?</h2>
                    <p className="text-xl md:text-xl text-center mb-2">Stripe handles payments infrastructure. RetryForge optimizes reclaiming failed invoices.</p>
                </div>
                <div className="grid md:grid-cols-[1fr_0.3fr_1fr] gap-1 items-stretch">
                    <div className=" bg-white border border-gray-200 rounded-2xl p-6">
                        <h3 className="text-3xl md:text-3xl font-bold">Stripe</h3>
                        <ul>
                            <li className="flex items-center gap-4 p-6 border border-gray-200 rounded-2xl">
                                <span>
                                    Generic retry strategy not tuned to customer behavior
                                </span>
                            </li>
                            <li className="flex items-center gap-4 p-6 border border-gray-200 rounded-2xl">
                                <span>
                                    Limited control over timing
                                </span>
                            </li>
                            <li className="flex items-center gap-4 p-6 border border-gray-200 rounded-2xl">
                                <span>
                                    No recovery analytics
                                </span>
                            </li>
                            <li className="flex items-center gap-4 p-6 border border-gray-200 rounded-2xl">
                                <span>
                                    Basic communication with your customer
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center justify-center text-2xl font-bold text-gray-400">
                        VS
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
                        <h3 className="text-3xl md:text-3xl font-bold">RetryForge</h3>
                        <ul>
                            <li className="flex items-center gap-4 p-6 border border-gray-200 rounded-2xl">
                                <div className="text-green-500 font-bold">✓</div>
                                <span>
                                    Optimized recovery timing and communication
                                </span>
                            </li>
                            <li className="flex items-center gap-4 p-6 border border-gray-200 rounded-2xl">
                                <div className="text-green-500 font-bold">✓</div>
                                <span>
                                    Detailed analytics
                                </span>
                            </li>
                            <li className="flex items-center gap-4 p-6 border border-gray-200 rounded-2xl">
                                <div className="text-green-500 font-bold">✓</div>
                                <span>
                                    Higher recovered MRR
                                </span>
                            </li>
                            <li className="flex items-center gap-4 p-6 border border-gray-200 rounded-2xl">
                                <div className="text-green-500 font-bold">✓</div>
                                <span>
                                    Customer-specific workflows
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}