import StripeStatusIndicator from '../StripeStatusIndicator'
import { useEffect } from 'react'
import { trackPageView } from '../../utils/analytics'
import { useLocation } from 'react-router-dom'

export default function DashboardRecoveries() {
    const location = useLocation()

    useEffect(() => {
        // Track page view on route change
        const pageTitle = document.title
        trackPageView(location.pathname, pageTitle)
    }, [location]);
    return (
        <>
            <div className="page">
                <div className="page-header grid md:grid-cols-2">
                    <div>
                        <h1>Recoveries</h1>
                        <p>Monitor payment recovery attempts.</p>
                    </div>
                    <StripeStatusIndicator />
                </div>

                <div className="table-card">
                    <table>
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={4}>
                                    No recovery activity yet.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div></>
    )
}