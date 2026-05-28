
import { Link } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import { isAuthenticated } from "../utils/authUtility";

export default function FinalCall() {
    const { auth } = useAuth();
    const loggedIn = isAuthenticated(auth);

    return loggedIn ? <></> :
        (
            <section className="final-cta px-8 grid">
                <h2>Start recovering failed payments automatically</h2>
                <p>
                    Connect Stripe in minutes and recover revenue without manual follow-up.
                </p>

                <Link to="/signup" className="nav-btn-primary final-cta-btn"
                    style={{ width: "165px" }}>
                    See If RetryForge Is a Fit
                </Link>
            </section>
        )
}