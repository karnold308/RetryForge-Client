import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import NoMatch from "./components/pages/404";
import Dashboard from "./components/pages/Dashboard";
import Demo from "./components/pages/Demo";
import SignUp from "./components/pages/SignUp";
import TermsAndConditions from "./components/pages/Terms";
import App from "./App";
import Cookies from "./components/pages/Cookies";



function Root() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Root