import Footer from "../Footer"
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../../utils/analytics'


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

            <Footer />
        </>
    )
}