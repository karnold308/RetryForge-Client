import { useEffect, useState } from "react"
import Footer from "../Footer"
import ScrollToTopBtn from "../ScrollToTopBtn"
import { useResendVerification } from "../../hooks/dashboard/mutations"
import { useLocation, useNavigate } from "react-router-dom"
import { trackPageView } from "../../utils/analytics"


export default function ResendVerification() {
    const location = useLocation()
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const {
        mutate: resendVerification,
        isPending,
        isSuccess,
        isError,
        data,
        error
    } = useResendVerification()

    useEffect(() => {
        // Track page view on route change
        const pageTitle = document.title
        trackPageView(location.pathname, pageTitle)
    }, [location])

    const handleSubmit = () => {
        resendVerification(email, {
            onSuccess: (response) => {
                if (response.data.alreadyVerified) {
                    navigate("/login?verified=already")
                    return
                }
            }
        })
    }

    return (
        <>
            <title>RetryForge - Resend Verification Email</title>
            <main className="p-6">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}>
                    <div className="signup-field xs:max-w-72">
                        <label htmlFor="email">
                            Email:
                        </label>
                        <input
                            id="email"
                            autoComplete="off"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text" />

                        <button
                            className="nav-btn-secondary border border-gray-300 px-5 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending
                                ? "Sending..."
                                : "Resend verification email"}
                        </button>
                    </div>
                </form>
                {isSuccess && (
                    <p className="text-green-600 mt-4">
                        {data?.data.message}
                    </p>
                )}
                {isError && (
                    <p className="text-red-600 mt-4">
                        {error.response?.data?.message ?? "Something went wrong."}
                    </p>
                )}
            </main>
            <ScrollToTopBtn />
            <Footer />
        </>
    )
}