import type { SolutionFeature } from '../models/types'

const solutionFeatures: SolutionFeature[] = [
    {
        title: "Smart retry scheduling",
        icon: "✓",
    },
    {
        title: "Recover failed payments without manual follow-up.",
        icon: "✓",
    },
    {
        title: "Real-time recovery visibility",
        icon: "✓",
    },
    {
        title: "Full Stripe integration",
        icon: "✓",
    },
    {
        title: "Automated \“update your card\” emails",
        icon: "✓",
    }
];

export default function Solution() {
    return (
        <section id="features" className="solution max-w-6xl py-20 mx-auto xs:pl-4 xs:pr-4 section-muted pb-24 
            xs:pb-4 border-t xs:pt-10 border-gray-200/70 md:grid-cols-2 xs:grid xs:grid-cols-1">
            {/* left column */}
            <div className="gap-12 md:grid items-center">
                <div>
                    <h2 className="text-[56px md:text-[56px] tracking-tight leading-14 font-normal text-left mb-6
                        xs:text-4xl xs:tracking-tighter leading-tight">
                        RetryForge recovers revenue - your way</h2>
                    <p className="text-gray-600 text-left max-w-2xl mx-auto">
                        Smart retries, optimized timing, and complete visibility into failed payment recovery.
                    </p>
                    <div className="mt-8 flex flex-col gap-[18px]">
                        {solutionFeatures.map((feature, index) => (
                            <div key={index} className="flex items-center gap-[14px] text-[17px]">
                                <span className="size-7 rounded-full bg-emerald-500/12 text-emerald-500 flex items-center justify-center font-bold">
                                    {feature.icon}
                                </span>
                                <h3>{feature.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* right column */}

            <div className="gap-12 md:grid items-center border border-gray-200 rounded-2xl shadow-lg xs:mt-10">
                <div>
                    <div>
                        <span>Early beta preview</span>
                    </div>
                    <img
                        src="/dashboard_mockup_2.png"
                        alt="RetryForge dashboard real time"
                        className="rounded-lg"
                    />

                </div>
            </div>
        </section>
    )
}