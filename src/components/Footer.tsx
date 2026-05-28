import { Link } from "react-router-dom";
import "../styles/Footer.css";
import useAuth from "../hooks/useAuth";
import { isAuthenticated } from "../utils/authUtility";



export default function Footer() {
    const { auth } = useAuth();
    const loggedIn = isAuthenticated(auth);

    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Left */}
                <div className="footer-brand">
                    <div className="footer-logo-row">
                        <Link to="/" className="signup-logo">
                            <img
                                loading="lazy"
                                src="/letter_mark_white_bg.png"
                                className="footer-logo"
                                alt="RetryForge logo"
                            />
                        </Link>

                        <span className="footer-brand-name">
                            RetryForge
                        </span>
                    </div>
                    <p className="footer-description">
                        Revenue recovery infrastructure for SaaS companies using Stripe.
                    </p>
                    <p className="footer-copyright">
                        © 2026 RetryForge™ · Operated by Garritys Goods LLC. All rights reserved.
                    </p>
                </div>

                {/* Right */}
                <div className="footer-links">
                    <div className="footer-column">
                        <h4>Product</h4>
                        <Link to="/#features">Features</Link>
                        <Link to="/#pricing">Pricing</Link>
                        <Link to="/#howItWorks">How It Works</Link>
                        {/* <a href="#">Dashboard</a> */}
                        {/* <a href="#">Stripe Integration</a> */}
                    </div>

                    <div className="footer-column">
                        <h4>Company</h4>
                        { /* <a href="/demo">Book a Demo</a> */ }
                        {loggedIn ? <></> :
                        <Link to="/signup">Sign Up</Link>
                        }
                        <a
                            href="mailto:support@retryforge.com"
                            className="text-indigo-600 hover:text-indigo-700"
                        >
                            Contact
                        </a>
                        {/*  <a href="#">Support</a> */}
                    </div>

                    <div className="footer-column">
                        <h4>Legal</h4>
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/terms">Terms</Link>
                        <Link to="/cookies">Cookies</Link>
                    </div>
                    {/* 
                    <div>
                        <p>Current User: {email}</p>
                        <p>Status: {status} </p>
                    </div> 
                    */}

                </div>
            </div>
        </footer>
    )
}