import { useEffect } from "react";

export default function HowItWorks() {

    useEffect(() => {
        const cards = document.querySelectorAll(".howItWorks-card");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            {
                threshold: 0.2,
            }
        );

        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);
    return (
        <section id="howItWorks" className="howItWorks px-8 grid pb-24 xs:pl-4 xs:pr-4 border-t border-gray-200/70
            xs:pb-8">
            <div className="max-w-[1100px] mx-auto py-[70px] xs:py-10 text-center">
                <h2 className="text-6xl md:text-6xl font-normal tracking-tight text-center mb-6 xs:text-4xl xs:tracking-tighter leading-tight">
                    How it works
                </h2>
                <p className="">Connect your account and start recovering revenue in minutes</p>

                <div className="relative mt-[60px] grid xs:mt-6 xs:grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="howItWorks-card bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
                        <div className="flex">
                            <div className="w-[38px] h-[38px] rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold 
                                mb-4 shadow-[0_0_0_6px_rgba(79,70,229,0.05)] transition-all duration-200 ease-in-out">1.</div>
                            <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2">&nbsp;Connect Stripe</h3>
                        </div>
                        {/* 
                        <p>Securely connect your account in seconds. No code changes required.</p>
                        */ }
                        <p>We're currently onboarding a small number of Stripe SaaS companies for hands-on implementation and feedback.</p>
                    </div>

                    <div className="howItWorks-card bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
                        <div className="flex">
                            <div className="w-[38px] h-[38px] rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold 
                                mb-4 shadow-[0_0_0_6px_rgba(79,70,229,0.05)] transition-all duration-200 ease-in-out">2.</div>
                            <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2">&nbsp;Detect failed payments</h3>
                        </div>
                        <p>We automatically analyze failed subscriptions and identify recoverable revenue.</p>
                    </div>

                    <div className="howItWorks-card bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition
                        border-2 border-indigo-600/20 bg-gradient-to-b from-white to-slate-50 shadow-[0_10px_30px_rgba(79,70,229,0.08)]">
                        <div className="flex">
                            <div className="w-[38px] h-[38px] rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold 
                                mb-4 shadow-[0_0_0_6px_rgba(79,70,229,0.05)] transition-all duration-200 ease-in-out">3.</div>
                            <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2">&nbsp;Recover Failed Payments</h3>
                        </div>
                        <p>Automatically retry failed invoices at higher-converting times run in the background to recover lost payments.</p>
                    </div>
                </div>
                <div className="mt-14 bg-white border border-gray-200 rounded-3xl p-9 shadow-sm shadow-[0_12px_24px_rgba(0,0,0,0.04)]">
                    <div>
                        <p className="text-indigo-600 text-sm font-semibold tracking-wide uppercase">
                            Recovery Analytics
                        </p>
                        <h3 className="text-[28px] my-[12px] text-gray-900">
                            See exactly what RetryForge recovers
                        </h3>
                        <p className="mb-4">
                            Track recovered revenue, retry performance,
                            and failed payment trends in real time.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 xs:gap-6">
                        <div className="bg-gray-50 border border-gray-200 rounded-[18px] p-6">
                            <span className="block text-sm text-gray-500 mb-2.5">
                                Failed revenue
                            </span>
                            <div className="text-[28px] text-[#111827] tracking-[1px] font-bold ">
                                $4,280
                            </div>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-[18px] p-6">
                            <span className="block text-sm text-gray-500 mb-2.5">
                                Recovered revenue
                            </span>
                            <div className="text-[28px] text-[#111827] tracking-[1px] font-bold text-emerald-500">
                                +$1,240
                            </div>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-[18px] p-6">
                            <span className="block text-sm text-gray-500 mb-2.5">
                                Recovery rate
                            </span>
                            <div className="text-[28px] text-[#111827] tracking-[1px] font-bold">
                                29%
                            </div>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-[18px] p-6">
                            <span className="block text-sm text-gray-500 mb-2.5">
                                Best retry window
                            </span>
                            <div className="text-[28px] text-[#111827] tracking-[1px] font-bold">
                                2:00 AM - 6:00 AM
                            </div>
                        </div>
                    </div>
                    <div className="mt-7 text-base font-semibold text-gray-900">
                        No guesswork. Just measurable recovered MRR.
                    </div>
                </div>
            </div>
        </section>
    )
}