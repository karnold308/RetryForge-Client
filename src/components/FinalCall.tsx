
import { Link } from 'react-router-dom'


export default function FinalCall() {

    return (
        <section className="final-cta px-8 py-8 grid pb-24 border-t border-gray-200/70 xs:px-4 xs:pb-16
            md:m-10">
            <h2 className="text-3xl" >Start recovering failed payments automatically</h2>
            <p className="text-gray-400 xs:py-4">
                Connect Stripe in minutes and recover revenue without manual follow-up.
            </p>

            <Link to="/signup" className="m-auto bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                style={{ width: "165px" }}>
                See If RetryForge Is a Fit
            </Link>
        </section>
    )
}