import Footer from "../Footer"
import '../../styles/Dashboard.css'
import { useMe } from '../../hooks/useMe'
import DashboardSidebar from '../DashboardSidebar'
import { Outlet } from "react-router-dom"
import DashboardNotConnected from './DashboardNotConnected'
import ScrollToTopBtn from '../ScrollToTopBtn'
import { useState } from 'react'



export default function DashboardLayout() {
    const { data: me, isLoading } = useMe()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    if (isLoading) return <div>Loading...</div>

    const isStripeConnected = me?.stripe?.connected === true

    return (
        <>
            <div className="dashboard-layout">
                {isStripeConnected ? (
                    <>
                        {sidebarOpen && (
                            <div
                                className="dashboard-backdrop"
                                onClick={() => setSidebarOpen(false)}
                            />
                        )}
                        <DashboardSidebar open={sidebarOpen}
                            onClose={() => setSidebarOpen(false)} />
                        <main className="dashboard-main px-6 pb-16">
                            <button
                                className="dashboard-mobile-menu-btn"
                                onClick={() =>
                                    setSidebarOpen(true)
                                }
                            >
                                ☰ Menu
                            </button>
                            <Outlet />
                        </main>
                    </>
                ) : (
                    <DashboardNotConnected />
                )
                }
            </div>
            <ScrollToTopBtn />
            <Footer />
        </>

    )
}