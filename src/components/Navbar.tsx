import { useState, useEffect, useRef } from "react";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const mobileButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;

            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(target) &&
                mobileButtonRef.current &&
                !mobileButtonRef.current.contains(target)
            ) {
                setMobileOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header>
            <nav className="navbar">
                <a href="/" className="logo">
                    <img className="headerLogo" loading="lazy" src="/letter_mark_white_bg.png" />
                </a>

                <div className="nav-links desktop-nav">
                    {/*  <a href="/" className="nav-btn-ghost">Home</a> */}
                    <a href="/#features" className="nav-btn-ghost">Features</a>
                    <a href="/#howItWorks" className="nav-btn-ghost">How It Works</a>
                    <a href="/#pricing" className="nav-btn-ghost">Pricing</a>
                    <a href="/signup" className="nav-btn-primary">Join Waiting List</a>
                    {/* <a href="/demo" className="nav-btn-primary">Book a Demo</a> */}
                    {/* <a href="/login" className="nav-btn-secondary">Login</a> */}
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
                    <a href="/#features" onClick={() => setMobileOpen(false)}>Features</a>
                    <a href="/#howItWorks" onClick={() => setMobileOpen(false)}>How It Works</a>
                    <a href="/#pricing" onClick={() => setMobileOpen(false)}>Pricing</a>
                    <a href="/demo" className="nav-btn-primary">Join Waiting List</a>
                    {/* <a href="/demo" className="nav-btn-primary">Book a Demo</a> */}
                    {/* <a href="/signup" className="nav-btn-primary">Get Started</a> */}
                </div>
            )}
        </header>
    )
}

