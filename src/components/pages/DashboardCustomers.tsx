import StripeStatusIndicator from '../StripeStatusIndicator'
import { useEffect } from 'react'
import { trackPageView } from '../../utils/analytics'
import { useLocation } from 'react-router-dom'

export default function DashboardCustomers() {
    const location = useLocation();
    useEffect(() => {
        // Track page view on route change
        const pageTitle = document.title
        trackPageView(location.pathname, pageTitle)
    }, [location]);

    return (
        <>
            <title>RetryForge - Dashboard - Customers</title>
            <div className="page">
            <div className="page-header grid md:grid-cols-2">
                <div>
                    <h1>Customers</h1>
                    <p>Customers with payment activity.</p>
                </div>
                <StripeStatusIndicator />
            </div>

            <div className="table-card">
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Status</th>
                            <th>MRR</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={3}>
                                No customer records available yet.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div></>
    )
}