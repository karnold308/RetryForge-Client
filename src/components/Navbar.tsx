import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import useLogout from "../hooks/useLogout"
import useAuth from '../hooks/useAuth'
import { isAuthenticated } from "../utils/authUtility"


export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const { auth } = useAuth()
    const logout = useLogout()
    const mobileMenuRef = useRef<HTMLDivElement | null>(null)
    const mobileButtonRef = useRef<HTMLButtonElement | null>(null)

    const isLoggedIn = isAuthenticated(auth) && null !== auth ? auth.accessToken !== '' : false


    const signOut = async () => {
        await logout();
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node

            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(target) &&
                mobileButtonRef.current &&
                !mobileButtonRef.current.contains(target)
            ) {
                setMobileOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        };
    }, []);


    return (
        <header>
            <nav className="navbar">
                <Link to="/" className="logo">
                    <img className="headerLogo" loading="lazy" src="/letter_mark_white_bg.png" />
                </Link>

                <div className="nav-links desktop-nav">
                    {/*  <a href="/" className="nav-btn-ghost">Home</a> */}
                    <Link to="/#features" className="nav-btn-ghost">Features</Link>
                    <Link to="/#howItWorks" className="nav-btn-ghost">How It Works</Link>
                    <Link to="/#pricing" className="nav-btn-ghost">Pricing</Link>
                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard" className="nav-btn-primary">Dashboard</Link>
                            <span className="user-welcome">Hello, {auth !== null ? auth.user : ''}</span>
                            <button onClick={signOut} className="nav-btn-secondary">Log Out</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-btn-secondary">Login</Link>
                            <Link to="/signup" className="nav-btn-primary">Join Waiting List</Link>
                        </>
                    )}
                    {/* <a href="/demo" className="nav-btn-primary">Book a Demo</a> */}
                    {/* <a href="/signup" className="nav-btn-primary">Get Started</a> */}
                </div>


                {/* Mobile Hamburger */}
                <button
                    ref={mobileButtonRef}
                    type="button"
                    className="mobile-menu-btn"
                    onClick={() => setMobileOpen(!mobileOpen)}>
                    ☰
                </button>
            </nav>

            {/* Mobile Dropdown */}

            {mobileOpen && (
                <div className="mobile-menu" ref={mobileMenuRef}>
                    <Link to="/#features" onClick={() => setMobileOpen(false)}>Features</Link>
                    <Link to="/#howItWorks" onClick={() => setMobileOpen(false)}>How It Works</Link>
                    <Link to="/#pricing" onClick={() => setMobileOpen(false)}>Pricing</Link>
                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard" className="nav-btn-primary">Dashboard</Link>
                            <span className="user-welcome">Hello, {null !== auth ? auth.user : ''}</span>
                            <button onClick={signOut} className="nav-btn-secondary">Log Out</button>
                        </>
                    ) :
                        (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/signup" className="nav-btn-primary">Join Waiting List</Link>
                                {/* <a href="/demo" className="nav-btn-primary">Book a Demo</a> */}
                            </>
                        )
                    }
                </div>
            )}
        </header>
    )
}

