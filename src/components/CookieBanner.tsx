import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { initGA } from "../utils/analytics"

const COOKIE_CONSENT_KEY = "retryforge_cookie_consent"

export default function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY)

        if (!consent) {
            setShowBanner(true)
        }

        if (
            consent === "accepted" &&
            import.meta.env.VITE_VERCEL_ENV === "production"
        ) {
            initGA()
        }

    }, [])


    const acceptCookies = () => {
        localStorage.setItem(
            COOKIE_CONSENT_KEY,
            "accepted"
        )

        if (import.meta.env.VITE_VERCEL_ENV === "production") {
            initGA()
        }

        setShowBanner(false)
    }


    const declineCookies = () => {
        localStorage.setItem(
            COOKIE_CONSENT_KEY,
            "declined"
        )

        setShowBanner(false)
    }


    if (!showBanner) return null


    return (
        <div className="
            fixed
            bottom-0
            left-0
            right-0
            z-50
            border-t
            bg-white
            p-4
            shadow-lg
        ">
            <div className="
                mx-auto
                flex
                max-w-5xl
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
            ">
                <p className="text-sm text-gray-700">
                    We use analytics cookies to improve RetryForge.
                    Learn more in our{" "}
                    <Link
                        to="/cookies"
                        className="text-blue-600 underline"
                    >
                        Cookie Policy
                    </Link>.
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={declineCookies}
                        className="
                            rounded-md
                            border
                            px-4
                            py-2
                            text-sm
                        "
                    >
                        Decline
                    </button>

                    <button
                        onClick={acceptCookies}
                        className="
                            rounded-md
                            bg-blue-600
                            px-4
                            py-2
                            text-sm
                            text-white
                        "
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    )
}