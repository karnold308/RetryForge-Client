import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import useRefreshToken from './hooks/useRefreshToken';
import useAuth from './hooks/useAuth';
import App from "./App";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import NoMatch from "./components/pages/404";
import Demo from "./components/pages/Demo";
import SignUp from "./components/pages/SignUp";
import TermsAndConditions from "./components/pages/Terms";
import Cookies from "./components/pages/Cookies";
import ConnectStripe from "./components/pages/ConnectStripe";
import Login from "./features/auth/Login";
import Dashboard from "./components/pages/Dashboard";
import ForgotPassword from "./components/pages/ForgotPassword";
import { ROLES } from './config/roles';
import RequireAuth from "./features/auth/RequireAuth";
import Navbar from './components/Navbar';
import PublicOnlyRoute from "./features/auth/PublicOnly";
import { IdleTimeoutProvider } from "./security/IdleTimeoutProvider";
import { setupInterceptors } from "./api/interceptors";
import { isAuthenticated } from "./utils/authUtility";



function Root() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const refresh = useRefreshToken();
    const { auth } = useAuth();


    useEffect(() => {
        setupInterceptors(refresh);
    }, [refresh]);

    
    useEffect(() => {
        const init = async () => {
            let isMounted = true;
            const verifyRefreshToken = async () => {
                try {
                    await refresh();
                } catch (err) {
                    console.error("No valid refresh session found:", err);
                } finally {
                    if (isMounted) setIsLoading(false);
                }
            };

            const persist = localStorage.getItem('persist') === 'true';

            // If user wants persistence and token isn't in memory yet, verify it
            if (persist && !isAuthenticated(auth)) {
                verifyRefreshToken();
            } else {
                setIsLoading(false);
            }

            return () => {
                isMounted = false;
            };

        }

        init()
    }, []);


    if (isLoading) {
        return (

            <div className="app-loader">
                <div className="app-loader-card">
                    <img
                        src="/letter_mark_white_bg.png"
                        alt="RetryForge"
                        className="app-loader-logo"
                    />

                    <div className="app-loader-spinner" />

                    <p className="app-loader-title">
                        Loading RetryForge
                    </p>

                    <p className="app-loader-subtitle">
                        Restoring your session securely...
                    </p>
                </div>
            </div>
        );
    }


    return (
        <BrowserRouter>
            <IdleTimeoutProvider timeoutInMinutes={30}>
                <Navbar />
                <Routes>
                    {/* public routes */}
                    <Route path="/" element={<App />} />
                    <Route path="/demo" element={<Demo />} />

                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsAndConditions />} />
                    <Route path="/cookies" element={<Cookies />} />
                    {/* public routes */}

                    <Route element={<PublicOnlyRoute />}>
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/login" element={<Login />} />
                    </Route>


                    {/* protected routes */}
                    <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                        {/* allowed roles ex.:   allowedRoles={[ROLES.Manager, ROLES.Admin]}  */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/connect/callback" element={<ConnectStripe />} />
                    </Route>
                    {/* protected routes */}


                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </IdleTimeoutProvider>
        </BrowserRouter>
    )
}

export default Root