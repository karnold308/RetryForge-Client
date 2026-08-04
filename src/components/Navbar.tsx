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
            <nav className="bg-white relative flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b border-gray-300">
                <div className="absolute left-0 logo flex-1 pl-2 pt-2">
                    <Link to="/" className="inline-block" >
                        <img className="headerLogo h-8 w-auto" loading="lazy" src="/letter_mark_white_bg.png" />
                    </Link>
                </div>

                <div className="nav-links desktop-nav hidden flex lg:flex items-center gap-4">
                    {/*  <a href="/" className="px-3.5 py-2 rounded-md text-gray-700 no-underline transition duration-200 ease-in-out">Home</a> */}
                    <Link to="/#features" className="px-3.5 py-2 rounded-md text-gray-700 no-underline transition-colors transition hover:bg-gray-100 duration-200 ease-in-out">Features</Link>
                    <Link to="/#howItWorks" className="px-3.5 py-2 rounded-md text-gray-700 no-underline transition transition hover:bg-gray-100 duration-200 ease-in-out">How It Works</Link>

                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard" className="nav-btn-primary bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">Dashboard</Link>
                            <span className="user-welcome">Hello, {auth !== null ? auth.email : ''}</span>
                            <button onClick={signOut} className="nav-btn-secondary border border-gray-300 px-5 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">Log Out</button>
                        </>
                    ) : (
                        <>
                            <Link to="/#pricing" className="px-3.5 py-2 rounded-md text-gray-700 no-underline transition transition hover:bg-gray-100 duration-200 ease-in-out">Pricing</Link>
                            <Link to="/login" className="nav-btn-secondary border border-gray-300 px-5 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">Login</Link>
                            <Link to="/signup" className="nav-btn-primary bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-[0_4px_9px_#4f46e540] transform: translateY(0); hover:bg-[#4338ca] hover:-translate-y-[1px] transition duration-200">Sign Up</Link>
                        </>
                    )}
                    {/* <a href="/demo" className="nav-btn-primary bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">Book a Demo</a> */}
                    {/* <a href="/signup" className="nav-btn-primary bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">Get Started</a> */}
                </div>



                {/* Mobile Hamburger */}
                <button
                    ref={mobileButtonRef}
                    type="button"
                    className="lg:hidden text-2xl px-3 py-2 ml-auto"
                    onClick={() => setMobileOpen(!mobileOpen)}>
                    ☰
                </button>
            </nav>

            {/* Mobile Dropdown */}

            {mobileOpen && (
                <div className="lg:hidden absolute items-start top-16 left-0 w-full bg-white border-t border-gray-200 flex flex-col gap-4 p-6" ref={mobileMenuRef}>
                    <Link to="/#features" onClick={() => setMobileOpen(false)}>Features</Link>
                    <Link to="/#howItWorks" onClick={() => setMobileOpen(false)}>How It Works</Link>

                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard" className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">Dashboard</Link>
                            <span className="user-welcome">Hello, {null !== auth ? auth.email : ''}</span>
                            <button onClick={signOut} className="border border-gray-300 px-5 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">Log Out</button>
                        </>
                    ) :
                        (
                            <>
                                <Link to="/#pricing" onClick={() => setMobileOpen(false)}>Pricing</Link>
                                <Link to="/login">Login</Link>
                                <Link to="/signup" className="w-1/2 bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">Sign Up</Link>
                                {/* <a href="/demo" className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">Book a Demo</a> */}
                            </>
                        )
                    }
                </div>
            )}
        </header>
    )
}

