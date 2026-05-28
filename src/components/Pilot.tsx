import { Link } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import { isAuthenticated } from "../utils/authUtility";

export default function Pilot() {
    const { auth } = useAuth();
    const loggedIn = isAuthenticated(auth);

    return loggedIn ? <></> : (
        <>
            <section className="pilotSection">
                <h2>Founding Pilot Program</h2>
                <p>
                    We're working with a small group of Stripe SaaS companies
                    to validate and improve RetryForge before public launch.
                </p>
                <ul>
                    <li>Direct access to the founder</li>
                    <li>Priority feature input</li>
                    <li>Discounted lifetime pricing</li>
                    <li>White-glove onboarding</li>
                </ul>
                <Link to="/signup" className="nav-btn-primary">
                    Apply for Pilot Access
                </Link>
            </section>
        </>
    )
}