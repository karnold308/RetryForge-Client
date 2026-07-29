import { useState, useEffect } from 'react'
import { useStripe } from '../hooks/useStripe'
import { maskStripeAccountId } from '../utils/maskStripe'
import { useQueryClient } from '@tanstack/react-query'
import useAxiosPrivate from '../hooks/useAxiosPrivate'


export default function StripeConnectionCard({
    forceOpen = false
}: {
    forceOpen?: boolean
}) {
    const [expanded, setExpanded] = useState(forceOpen)
    const { stripe, isLoading } = useStripe()
    const queryClient = useQueryClient()
    const axiosPrivate = useAxiosPrivate()
    const [refreshing, setRefreshing] = useState(false)

    

    useEffect(() => {
        if (forceOpen) {
            setExpanded(true)
            document.getElementById("stripe-card")?.scrollIntoView()
        }
    }, [forceOpen])

    if (isLoading || !stripe) {
        return <div>Loading...</div>
    }

    const maskedAccount = maskStripeAccountId(stripe.stripeAccountId)

    const refreshConnection = async () => {
        setRefreshing(true)
        try {
            const res = await axiosPrivate.post("/api/stripe/refresh")
            queryClient.invalidateQueries({ queryKey: ["me"] })

            if (res.status !== 200) {
                throw new Error("Failed to refresh Stripe")
            }
        } catch (err) {
            console.error(err)
            alert("Something went wrong refreshing Stripe")
        } finally {
            setRefreshing(false)
        }
    }

    const disconnectStripe = async () => {
        const confirmed = window.confirm("Disconnect Stripe from RetryForge?")
        if (!confirmed) {
            return
        }

        try {
            const res = await axiosPrivate.post("/api/stripe/disconnect")
            queryClient.invalidateQueries({ queryKey: ["me"] })

            if (res.status !== 200) {
                throw new Error("Failed to disconnect Stripe")
            }

            window.location.href = '/dashboard'
        } catch (err) {
            console.error(err)
            alert("Something went wrong disconnecting Stripe")
        }

    }

    return (
        <div className="bg-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                        Stripe Connection
                    </h3>
                    <p className="text-slate-500 mt-1">
                        Manage your connected Stripe account
                    </p>
                </div>
                <button
                    onClick={() =>
                        setExpanded(!expanded)
                    }
                    className="
                        px-4 py-2
                        rounded-lg
                        bg-slate-100
                        hover:bg-slate-200
                        text-slate-700
                        font-medium
                        transition
                    "
                >
                    {expanded
                        ? "Hide Details"
                        : "Manage Connection"}
                </button>
            </div>
            {expanded && (
                <div className="mt-6 pt-6 border-t border-slate-200 ">
                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2
                            px-3
                            py-1
                            rounded-full
                            bg-emerald-50
                            text-emerald-700
                            font-medium
                            mb-6
                        "
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Connected
                    </div>
                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            xl:grid-cols-3
                            gap-4
                        "
                    >
                        <InfoCard
                            label="Stripe Account"
                            value={maskedAccount}
                        />
                        <InfoCard
                            label="Email"
                            value={stripe.stripeEmail ?? ''}
                        />
                        <InfoCard
                            label="Country"
                            value={stripe.country ?? ''}
                        />
                        <InfoCard
                            label="Charges"
                            value={
                                stripe.chargesEnabled
                                    ? "Enabled"
                                    : "Disabled"
                            }
                        />
                        <InfoCard
                            label="Payouts"
                            value={
                                stripe.payoutsEnabled
                                    ? "Enabled"
                                    : "Disabled"
                            }
                        />
                    </div>
                    <div
                        className="
                            mt-6
                            flex
                            flex-col
                            sm:flex-row
                            gap-3
                        "
                    >
                        <button disabled={refreshing}
                            onClick={refreshConnection}
                            className="
                                px-5
                                py-3
                                rounded-xl
                                bg-emerald-500
                                hover:bg-emerald-600
                                text-white
                                font-medium
                                transition
                            "
                        >
                            {refreshing ? 'Refreshing...' : 'Refresh Connection'}
                        </button>
                        <button
                            onClick={disconnectStripe}
                            className="
                                px-5
                                py-3
                                rounded-xl
                                bg-red-500
                                hover:bg-red-600
                                text-white
                                font-medium
                                transition
                            "
                        >
                            Disconnect Stripe
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

function InfoCard({
    label,
    value
}: {
    label: string
    value: string
}) {
    return (
        <div
            className="
                bg-slate-50
                rounded-xl
                p-4
            "
        >
            <div
                className="
                    text-xs
                    uppercase
                    tracking-wide
                    text-slate-500
                    mb-1
                "
            >
                {label}
            </div>

            <div
                className="
                    font-semibold
                    text-slate-900
                    break-all
                "
            >
                {value}
            </div>
        </div>
    )
}
