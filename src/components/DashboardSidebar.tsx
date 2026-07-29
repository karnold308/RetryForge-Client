import { NavLink } from 'react-router-dom'
import { dashboardNav } from '../routes/dashboardNav'
import '../styles/DashboardSidebar.css'
import { useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'

type Props = {
    open?: boolean
    onClose?: () => void
}

export default function DashboardSidebar({ open = false, onClose }: Props) {
    const location = useLocation()
    const touchStartX = useRef<number | null>(null)


    useEffect(() => {
        onClose?.()
    }, [location.pathname])

    useEffect(() => {
        if (!open) return

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose?.()
            }
        }

        window.addEventListener("keydown", handleEsc)

        return () => window.removeEventListener("keydown", handleEsc)
    }, [open, onClose])

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [open])

    useEffect(() => {
        if (!open) return

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX.current = e.touches[0].clientX
        }

        const handleTouchEnd = (e: TouchEvent) => {
            if (touchStartX.current === null) return

            const endX = e.changedTouches[0].clientX
            const diff = endX - touchStartX.current

            // swipe left to close (threshold)
            if (diff < -80) {
                onClose?.()
            }

            touchStartX.current = null
        }

        window.addEventListener("touchstart", handleTouchStart)
        window.addEventListener("touchend", handleTouchEnd)

        return () => {
            window.removeEventListener("touchstart", handleTouchStart)
            window.removeEventListener("touchend", handleTouchEnd)
        }
    }, [open, onClose])


    return (
        <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
            <div className="brand">
                <img src="/full_logo_with_name_2.png" alt="RetryForge" />
            </div>

            <nav className="nav">
                {dashboardNav.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.exact}
                        onClick={() =>
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            })
                        }
                        className={({ isActive }) =>
                            isActive ? "nav-item active" : "nav-item"
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}