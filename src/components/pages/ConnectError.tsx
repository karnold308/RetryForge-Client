import { useEffect } from 'react'
import { trackPageView } from '../../utils/analytics'
import { useLocation } from 'react-router-dom'
import Footer from '../Footer';

export default function ConnectError() {
    const location = useLocation()

    useEffect(() => {
        // Track page view on route change
        const pageTitle = document.title
        trackPageView(location.pathname, pageTitle)
    }, [location]);


    return (
        <>
            <title>RetryForge - Stripe Connect Error</title>
            <main>
            <p>
                There was an error when connecting your Stripe account to RetryForge. Please try again and if the problem persists, reach out to 
                <a
                    href="mailto:support@retryforge.com"
                    className="text-indigo-600 hover:text-indigo-700"
                >
                    &nbsp;Support 
                </a>
                . Please also include time/date of the issue when sending the email.
            </p>
            </main>
            <Footer />
        </>
    )
}