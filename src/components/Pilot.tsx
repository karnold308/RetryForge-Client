import { Link } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import { isAuthenticated } from "../utils/authUtility";

export default function Pilot() {
    const { auth } = useAuth();
    const loggedIn = isAuthenticated(auth);

    return loggedIn ? <></> : (
        <>
            <section className=" relative m-auto border border-blue-200 p-4 pb-20 mb-12 xs:py-6 xs:pl-4 xs:pr-4
            overflow-hidden rounded-2xl py-20 max-w-5xl items-center rounded-4xl md:ml-10 md:mr-10 pl-16 pr-16
            before:content-[''] before:absolute before:top-0 before:left-0 before:w-full 
            before:h-1 before:bg-[linear-gradient(90deg,#4f46e5,#818cf8)]
            bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.10),transparent_35%),linear-gradient(to_bottom_right,#FFFFFF,#F8FAFC)]">
                <h2 className="text-6xl md:text-6xl font-extrabold text-left mb-6 text-left
                    xs:text-4xl xs:tracking-tighter leading-tight">
                    Founding Pilot Program</h2>
                <p className="text-gray-600 text-left max-w-2xl pb-12">
                    We're working with a small group of Stripe SaaS companies
                    to validate and improve RetryForge before public launch.
                </p>
                <ul className="grid md:grid-cols-2 xs:grid-cols-1 gap-4 pb-8">
                    <li className="bg-white flex items-center gap-4 p-6 font-bold border border-gray-200 rounded-2xl
                        before:content-['✓'] before:text-[#4f46e5] before:bg-[#4f46e5]/10 before:rounded-full before:flex before:justify-center before:align-middle before:items-center before:w-[26px] before:h-[26px] before:min-w-[26px] before:text-[14px] before:font-bold">
                        Direct access to the founder
                    </li>
                    <li className="bg-white flex items-center gap-4 p-6 font-bold border border-gray-200 rounded-2xl
                        before:content-['✓'] before:text-[#4f46e5] before:bg-[#4f46e5]/10 before:rounded-full before:flex before:justify-center before:align-middle before:items-center before:w-[26px] before:h-[26px] before:min-w-[26px] before:text-[14px] before:font-bold">
                            Priority feature input</li>
                    <li className="bg-white flex items-center gap-4 p-6 font-bold border border-gray-200 rounded-2xl
                        before:content-['✓'] before:text-[#4f46e5] before:bg-[#4f46e5]/10 before:rounded-full before:flex before:justify-center before:align-middle before:items-center before:w-[26px] before:h-[26px] before:min-w-[26px] before:text-[14px] before:font-bold">
                            Discounted lifetime pricing</li>
                    <li className="bg-white flex items-center gap-4 p-6 font-bold border border-gray-200 rounded-2xl
                        before:content-['✓'] before:text-[#4f46e5] before:bg-[#4f46e5]/10 before:rounded-full before:flex before:justify-center before:align-middle before:items-center before:w-[26px] before:h-[26px] before:min-w-[26px] before:text-[14px] before:font-bold">
                            White-glove onboarding</li>
                </ul>
                <Link to="/signup" className="nav-btn-primary bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
                    Apply for Pilot Access
                </Link>
            </section>
        </>
    )
}