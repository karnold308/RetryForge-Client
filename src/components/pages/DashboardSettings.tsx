import StripeConnectionCard from "../StripeConnectionCard"
import { useEffect } from "react"
import StripeStatusIndicator from '../StripeStatusIndicator'
import { trackPageView } from '../../utils/analytics'
import { useLocation } from 'react-router-dom'



export default function DashboardSettings() {
    const location = useLocation()
    const openStripe = location.hash === '#stripe'
    
    useEffect(() => {
        // Track page view on route change
        const pageTitle = document.title
        trackPageView(location.pathname, pageTitle)
    }, [location]);

    useEffect(() => {
        if (window.location.hash === "#stripe") {
            const el = document.getElementById("stripe-section")
            el?.scrollIntoView({ behavior: "smooth" })
        }
    }, [])

    return (
        <>
            <title>RetryForge - Dashboard - Settings</title>
            <div className="page">
                <div className="page-header grid md:grid-cols-2">
                    <div>
                        <h1>Settings</h1>
                        <p>Manage your RetryForge account.</p>
                    </div>
                    <StripeStatusIndicator />
                </div>

                <div className="settings-grid">
                    <div id="stripe-card" className="dashboard-card">
                        <StripeConnectionCard forceOpen={openStripe} />
                    </div>

                    <div className="dashboard-card">
                        <h3>Notifications</h3>
                        <p>
                            Configure recovery alerts and account emails.
                        </p>
                        <button>
                            Configure
                        </button>
                    </div>

                    <div className="dashboard-card">
                        <h3>Account</h3>
                        <p>
                            Manage organization settings.
                        </p>
                        <button>
                            Edit Profile
                        </button>
                    </div>
                    <div className="dashboard-card">
                        <h3>Security</h3>
                        <button>
                            Change Password
                        </button>
                    </div>

                </div>
            </div></>
    )
}