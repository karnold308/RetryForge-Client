

export default function RecoveryFlow() {
    return (
        <>
            <section className="bg-white py-24 section-light xs:pt-10 xs:pl-4 xs:pr-4 pb-24 xs:pb-16 border-t border-gray-200/70">
                <div className="max-w-6xl mx-auto px-6 max-w-[1150px] mx-auto w-full">
                    <div className="text-center max-w-[760px] mx-auto xs:mb-6 mb-16">
                        <h2 className="text-6xl md:text-6xl font-normal text-center mb-6 xs:text-4xl
                            xs:tracking-tighter leading-tight">
                            What happens after a payment fails
                        </h2>
                        <p className="mt-4 text-lg leading-7 text-gray-500">
                            From failed payment to recovered revenue — fully automated.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-5 xs:grid-cols-1 gap-6 relative">
                        <div className="relative bg-white border border-[#E5E7EB] rounded-[18px] p-7 wrap-break-word transition-all duration-250 ease-out overflow-hidden
                            transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),_0_12px_24px_rgba(0,0,0,0.06),_0_24px_48px_rgba(0,0,0,0.04)]">
                            <div className="w-[42px] h-[42px] rounded-full bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-bold mb-[18px] shadow-[0_0_0_6px_rgba(79,70,229,0.05)]">
                                1.</div>
                            <h3 className="text-xl md:text-xl font-semibold text-black text-left mb-6">
                                Payment fails</h3>
                            <p className="text-gray-600 text-left max-w-2xl mx-auto">
                                Stripe triggers an
                                <code className="bg-gray-100 text-gray-700 text-l font-medium px-1.5 py-0.5 rounded-md"> invoice.payment_failed </code>
                                event when a subscription payment cannot be processed.
                            </p>
                        </div>
                        <div className="relative bg-white border border-[#E5E7EB] rounded-[18px] p-7 wrap-break-word transition-all duration-250 ease-out overflow-hidden 
                            transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),_0_12px_24px_rgba(0,0,0,0.06),_0_24px_48px_rgba(0,0,0,0.04)]">
                            <div className="w-[42px] h-[42px] rounded-full bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-bold mb-[18px] shadow-[0_0_0_6px_rgba(79,70,229,0.05)]">
                                2.</div>
                            <h3 className="text-xl md:text-xl font-semibold text-black text-left mb-6">
                                Recovery case created</h3>
                            <p className="text-gray-600 text-left max-w-2xl mx-auto">
                                RetryForge automatically creates a recovery case and schedules
                                retry attempts and customer recovery actions.
                            </p>
                        </div>
                        <div className="relative bg-white border border-[#E5E7EB] rounded-[18px] p-7 wrap-break-word transition-all duration-250 ease-out overflow-hidden 
                            transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),_0_12px_24px_rgba(0,0,0,0.06),_0_24px_48px_rgba(0,0,0,0.04)]">
                            <div className="w-[42px] h-[42px] rounded-full bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-bold mb-[18px] shadow-[0_0_0_6px_rgba(79,70,229,0.05)]">
                                3.</div>
                            <h3 className="text-xl md:text-xl font-semibold text-black text-left mb-6">
                                Customer notified</h3>
                            <p className="text-gray-600 text-left max-w-2xl mx-auto">
                                Automated recovery emails prompt the customer to update their
                                payment method if needed.
                            </p>
                        </div>
                        <div className="relative bg-white border border-[#E5E7EB] rounded-[18px] p-7 wrap-break-word transition-all duration-250 ease-out overflow-hidden
                            transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),_0_12px_24px_rgba(0,0,0,0.06),_0_24px_48px_rgba(0,0,0,0.04)]">
                            <div className="w-[42px] h-[42px] rounded-full bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-bold mb-[18px] shadow-[0_0_0_6px_rgba(79,70,229,0.05)]">
                                4.</div>
                            <h3 className="text-xl md:text-xl font-semibold text-black text-left mb-6">
                                Retry executed</h3>
                            <p className="text-gray-600 text-left max-w-2xl mx-auto">
                                RetryForge triggers optimized payment retries based on recovery
                                timing and customer behavior.
                            </p>
                        </div>
                        <div className="relative bg-white border border-[#E5E7EB] rounded-[18px] p-7 wrap-break-word transition-all duration-250 ease-out overflow-hidden 
                            transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),_0_12px_24px_rgba(0,0,0,0.06),_0_24px_48px_rgba(0,0,0,0.04)] 
                            border-2 border-emerald-500/20 bg-gradient-to-b from-white via-[#ecfdf5]/80 to-[#ecfdf5]/80 
                            bg-[rgba(16,185,129,0.12)] text-[#10B981] shadow-[0_0_0_6px_rgba(16,185,129,0.06)]">
                            <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center font-bold mb-[18px] bg-emerald-500/12 text-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.06)]">
                                5.</div>
                            <h3 className="text-xl md:text-xl font-semibold text-black text-left mb-6">
                                Revenue recovered</h3>
                            <p className="text-gray-600 text-left max-w-2xl mx-auto">
                                Successful payments are marked as recovered and all remaining
                                recovery jobs are automatically canceled.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}