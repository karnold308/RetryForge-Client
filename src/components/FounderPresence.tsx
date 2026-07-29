import { Link } from 'react-router-dom'
import useAuth from "../hooks/useAuth"
import { isAuthenticated } from "../utils/authUtility"

export default function FounderPresence() {
    const { auth } = useAuth()
    const loggedIn = isAuthenticated(auth) && null !== auth ? auth.accessToken !== '' : false

    return (
        <>
            <section className="py-[110px] bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.06),transparent_45%),#FFFFFF] 
                xs:py-6 xs:pl-4 xs:pr-4 border-t border-gray-200 m-auto mb-10 p-10 scroll-mt-[220px] shadow-[0_1px_2px_#0000000a,0_20px_40px_#0000000f] ">
                <div className="max-w-[1080px] mx-auto grid md:grid-cols-[320px_1fr] gap-16 items-center px-6 xs:px-0 xs:grid-cols-1">
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
                        <img
                            src="/founder.png"
                            alt="Founder of RetryForge"
                            className="w-24 h-24 rounded-full object-cover mb-5 border-4 border-[#EEF2FF]"
                        />
                        <div className="text-[22px] font-bold -tracking-[0.5px] text-[#111827] mb-[6px]">Kevin Arnold</div>
                        <div className="text-[15px] text-gray-500 mb-6">
                            Founder of RetryForge
                        </div>
                        <div className="flex flex-col gap-[14px] text-left">
                            <div className="flex gap-3 items-start p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                                <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#4f46e5]/10 text-sm font-bold text-[#4f46e5]">↺</div>
                                <div>
                                    <strong>Built specifically for SaaS&nbsp;</strong>
                                    <span>
                                        Focused entirely on failed subscription payment recovery.
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                                <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#4f46e5]/10 text-sm font-bold text-[#4f46e5]">⚡</div>
                                <div>
                                    <strong>Working directly with pilot users&nbsp;</strong>
                                    <span>
                                        Early customers help shape recovery workflows and features.
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                                <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#4f46e5]/10 text-sm font-bold text-[#4f46e5]">✓</div>
                                <div>
                                    <strong>Founder-led support&nbsp;</strong>
                                    <span>
                                        Direct access during onboarding and implementation.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:m-10">
                        <div className="inline-flex px-[14px] py-2 rounded-full bg-[#4f46e5]/[0.08] text-indigo-700 text-[13px] font-bold uppercase mb-[22px]">
                            Built by a founder obsessed with failed payment recovery
                        </div>
                        <h2 className="text-5xl leading-[1.02] -tracking-[3px] text-[#111827] mb-[26px]">
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
                        <p className="text-gray-900 font-semibold">
                            RetryForge is being built to help SaaS teams recover revenue automatically
                            without adding operational overhead.
                        </p>
                        <div className="mt-[34px] p-[24px_28px] border-l-4 border-l-[#4F46E5] rounded-[0_18px_18px_0] 
                            bg-[linear-gradient(to_right,_rgba(79,70,229,0.05),_rgba(255,255,255,0))]">
                            <p className="m-0 text-gray-900">
                                <strong className="text-indogo-600">Currently onboarding a small number of pilot users </strong>
                                to help shape the product and recovery workflows.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-9">
                            {loggedIn ? <></> :
                                <>
                                    <Link to="/signup" className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
                                        Join Early Access
                                    </Link>
                                    <Link to="#pricing" className="border border-gray-300 px-5 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
                                        View Pilot Pricing
                                    </Link>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}