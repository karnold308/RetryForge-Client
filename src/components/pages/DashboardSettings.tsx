import StripeConnectionCard from "../StripeConnectionCard"
import { useEffect, useState } from "react"
import StripeStatusIndicator from '../StripeStatusIndicator'
import { trackPageView } from '../../utils/analytics'
import { useLocation } from 'react-router-dom'
import ChangePasswordForm from "../ChangePasswordForm"


export default function DashboardSettings() {
    const location = useLocation()
    const [expanded, setExpanded] = useState(false)
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

                    {/* 
                    <div className="dashboard-card">
                        <h3>Notifications</h3>
                        <p>
                            Configure recovery alerts and account emails.
                        </p>
                        <button>
                            Configure
                        </button>
                    </div>
                    */}
                    {/* 
                    <div className="dashboard-card">
                        <h3>Account</h3>
                        <p>
                            Manage organization settings.
                        </p>
                        <button>
                            Edit Profile
                        </button>
                    </div>
                    */}
                    <div className="dashboard-card">
                        <h3>Security</h3>
                        <button className="nav-btn-secondary mt-2 inline-block border! border-gray-300! px-5 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
                            onClick={() =>
                                setExpanded(!expanded)
                            }>
                            Change Password
                        </button>
                        {expanded && <ChangePasswordForm />}

                    </div>

                </div>
            </div></>
    )
}