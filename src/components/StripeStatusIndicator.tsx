
import { useMe } from "../hooks/useMe"
import { useNavigate } from "react-router-dom"

type Props = {
    showConnectAction?: boolean
}

function StripeStatusSkeleton() {
    return (
        <div className="flex items-center justify-between mb-6 animate-pulse">
            <div className="h-7 w-40 bg-slate-200 rounded" />

            <div className="h-7 w-44 bg-slate-200 rounded-full" />
        </div>
    )
}

export default function StripeStatusIndicator({
    showConnectAction = true
}: Props) {
    const { data: me, isLoading } = useMe()
    const navigate = useNavigate()

    const goToStripeSettings = () => {
        navigate("/dashboard/settings#stripe")
    }

    const connected = me?.stripe?.connected === true

    if (isLoading) {
        return <StripeStatusSkeleton />
    }

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                {connected ? (
                    <button
                        onClick={goToStripeSettings}
                        className="flex ml-auto cursor-pointer items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-medium text-emerald-700">
                            Stripe connected
                        </span>
                    </button>
                ) : (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={goToStripeSettings}
                            className="flex ml-auto cursor-pointer items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 hover:bg-red-100 transition"
                        >
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="text-sm font-medium text-red-700">
                                Stripe not connected
                            </span>
                        </button>

                        {showConnectAction && (
                            <a
                                href="/api/stripe/connect"
                                className="text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-lg transition"
                            >
                                Connect
                            </a>
                        )}
                    </div>
                )}
            </div>
        </>
    )
} 