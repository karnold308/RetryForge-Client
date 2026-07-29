import { useEffect } from "react"
import Footer from "../Footer"
import ScrollToTopBtn from "../ScrollToTopBtn"
import { useLocation } from "react-router-dom"
import { trackPageView } from "../../utils/analytics"
import RequestPasswordResetForm from "../RequestPasswordResetForm"


export default function ForgotPassword() {
    const location = useLocation()

    useEffect(() => {
        // Track page view on route change
        const pageTitle = document.title
        trackPageView(location.pathname, pageTitle)
    }, [location])

    

    return (
        <>
            <title>RetryForge - Forgot Password</title>
            <main className="p-6">
                <RequestPasswordResetForm heading="Forgot your password?"/>
            </main>
            <ScrollToTopBtn />
            <Footer />
        </>
    )
}