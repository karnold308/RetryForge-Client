import "../../styles/Login.css"
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, Link, useSearchParams } from 'react-router-dom'
import { trackPageView } from '../../utils/analytics'
import { useActionState } from 'react'
import useAuth from "../../hooks/useAuth"
import axios from '../../api/axios'
import { AxiosError } from 'axios'
import { ApiErrorResponse, AUTH_ERRORS, FormState } from "../../models/types"
import { useQueryClient } from "@tanstack/react-query"

const AUTH_URL = '/auth'


export default function Login() {
    const { setAuth, persist, setPersist } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const userRef = useRef<HTMLInputElement | null>(null)
    const errRef = useRef<HTMLParagraphElement | null>(null)
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    // const [errMsg, setErrMsg] = useState('')
    // const [successMsg, setSuccessMsg] = useState("")
    const redirectTargetRef = useRef<string>("/dashboard")
    const queryClient = useQueryClient()
    const [needsEmailVerification, setNeedsEmailVerification] = useState(false)
    // const [resendSent, setResendSent] = useState(false)
    // const [verificationMessage, setVerificationMessage] = useState("")
    const [searchParams] = useSearchParams()
    const showTimeoutNotice = location.state?.reason === 'timeout'
    const [showResendVerification, setShowResendVerification] = useState(false)
    const [pageMessage, setPageMessage] = useState<{
        type: "success" | "error"
        text: string
    } | null>(null)

    const [formMessage, setFormMessage] = useState<{
        type: "success" | "error"
        text: string
    } | null>(null)

    const passwordReset = searchParams.get("passwordReset")

    useEffect(() => {
        if (passwordReset === "success") {
            setPageMessage({
                type: "success",
                text: "Your password has been reset successfully. Please sign in."
            })

            searchParams.delete("passwordReset")

            window.history.replaceState(
            {},
            "",
            "/login"
        )
        }
    }, [])

    useEffect(() => {
        if (userRef.current) userRef.current.focus()
        const fromLocation = location.state?.from
        if (fromLocation) {
            const fullPath = `${fromLocation.pathname}${fromLocation.search || ''}`
            redirectTargetRef.current = fullPath
        }

        const verified = searchParams.get("verified")

        if (!verified) {
            return
        }

        switch (verified) {
            // case "success":
            //     setVerificationMessage("Your email has been verified. You can now sign in.")
            //     break

            // case "already":
            //     setVerificationMessage("Your email was already verified. You can sign in.")
            //     break

            // case "invalid":
            //     setVerificationMessage("This verification link is invalid or has expired.")
            //     setShowResendVerification(true)
            //     break

            case "success":
                setPageMessage({
                    type: "success",
                    text: "Your email has been verified. You can now sign in."
                })
                break

            case "already":
                setPageMessage({
                    type: "success",
                    text: "Your email was already verified. You can sign in."
                })
                break

            case "invalid":
                setPageMessage({
                    type: "error",
                    text: "This verification link is invalid or has expired."
                })

                setShowResendVerification(true)
                break

        }

        window.history.replaceState(
            {},
            "",
            "/login"
        )

    }, [searchParams, setPersist])

    useEffect(() => {
        const stored = localStorage.getItem('persist')

        if (stored !== null) {
            setPersist(stored === 'true')
        } else {
            setPersist(true)
            localStorage.setItem('persist', 'true')
        }
    }, [])

    useEffect(() => {
        setFormMessage(null)
        setNeedsEmailVerification(false)
        // setResendSent(false)
    }, [user, pwd])

    const togglePersist = () => {
        setPersist((prev) => {
            const nextValue = !prev
            localStorage.setItem("persist", String(nextValue))
            return nextValue
        })
    }

    const handleResendVerification = async () => {
        try {
            const response = await axios.post(
                "/resend-verification",
                {
                    email: user
                }
            )

            // setErrMsg(response.data.message)
            setFormMessage({
                type: "success",
                text: response.data.message
            })
            setNeedsEmailVerification(false)
            // setResendSent(true)
        } catch (err) {
            // setResendSent(false)
            // setErrMsg("Unable to resend verification email. Please try again.")
            setFormMessage({
                type: "error",
                text: "Unable to resend verification email. Please try again."
            })
        }
    }

    useEffect(() => {
        // Track page view on route change
        const pageTitle = document.title
        trackPageView(location.pathname, pageTitle)
    }, [location])

    async function handleSubmit(prevState: FormState, formData: FormData):
        Promise<FormState> {
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const isDeviceTrusted = localStorage.getItem('persist') === 'true'

        void prevState;

        try {
            // const resp = await login({ email, pwd })
            const resp = await axios.post(`${AUTH_URL}/login`,
                JSON.stringify({ email, pwd: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )

            const accessToken = resp?.data?.accessToken
            const roles = resp?.data?.roles

            setPersist(isDeviceTrusted)

            setAuth({ userId: 0, email: email, roles, accessToken: accessToken })
            setUser('')
            setPwd('')
            queryClient.invalidateQueries({ queryKey: ["me"] })

            navigate(redirectTargetRef.current, { replace: true })

            return { success: true, message: "Success" }
        } catch (err) {
            const error = err as AxiosError<ApiErrorResponse>

            setFormMessage({
                type: "error",
                text: error.message
            })

            if (!error.response) {
                // setErrMsg("No Server Response")
                setFormMessage({
                    type: "error",
                    text: "No Server Response"
                })
            } else if (error.response?.status === 400) {
                // setErrMsg("Missing Email or Password")
                setFormMessage({
                    type: "error",
                    text: "Missing Email or Password"
                })
            } else if (error.response?.status === 401) {
                // setErrMsg("Unauthorized")
                setFormMessage({
                    type: "error",
                    text: "Unauthorized"
                })
            } else if (error.response?.status === 429) {
                // setErrMsg("Too Many Login Attempts. Try Again In 5 Minutes.")
                setFormMessage({
                    type: "error",
                    text: "Too Many Login Attempts. Try Again In 5 Minutes."
                })
            } else if (error.response?.data?.code === AUTH_ERRORS.EMAIL_NOT_VERIFIED) {
                // setErrMsg(error.response.data.message)
                setFormMessage({
                    type: "error",
                    text: error.response.data.message
                })
                setNeedsEmailVerification(true)
            } else {
                // setErrMsg("Login Failed")
                setFormMessage({
                    type: "error",
                    text: "Login Failed"
                })
            }

            if (errRef.current) errRef.current.focus()

            return {
                success: false,
                message: error.message,
            }
        }
    }

    const [state, submitAction, isPending] = useActionState(handleSubmit, {
        success: false,
        message: null,
    })

    void state;


    return (
        <>
            <title>RetryForge - Login</title>
            <main className="px-6 pb-16">
                <div className="auth-page">
                    <div className="auth-shell">
                        <div className="auth-brand">
                            <img
                                src="/full_logo_with_name_2.png"
                                alt="RetryForge"
                                className="auth-logo"
                            />
                            <h1>Welcome back</h1>
                            <p>
                                Sign in to monitor failed payments, recovered revenue,
                                and retry performance.
                            </p>
                            <div className="auth-feature-list">
                                <div className="auth-feature">
                                    <span>✓</span>
                                    <p>Recovery analytics dashboard</p>
                                </div>
                                <div className="auth-feature">
                                    <span>✓</span>
                                    <p>Stripe subscription monitoring</p>
                                </div>
                                <div className="auth-feature">
                                    <span>✓</span>
                                    <p>Automated failed payment recovery</p>
                                </div>
                            </div>
                        </div>
                        <div className="auth-card">
                            <div className="auth-card-header">
                                <h2>Sign in</h2>
                                {showTimeoutNotice && (
                                    <div style={{
                                        background: '#fff3cd',
                                        color: '#856404',
                                        padding: '0.75rem',
                                        borderRadius: '4px',
                                        marginBottom: '1rem',
                                        fontSize: '0.9rem',
                                        border: '1px solid #ffeeba',
                                        fontWeight: '500'
                                    }}>
                                        For security, your session expired after inactivity. Please sign in again.
                                    </div>
                                )}
                                <p>Access your RetryForge dashboard</p>
                            </div>

                            {pageMessage && (
                                <div className={
                                    pageMessage
                                        ? pageMessage?.type === "success"
                                            ? "successmsg"
                                            : "errmsg"
                                        : "offscreen"
                                }
                                    aria-live="polite"
                                    style={{
                                        background:
                                            pageMessage.type === "success"
                                                ? "#d1fae5"
                                                : "#fee2e2",
                                        color:
                                            pageMessage.type === "success"
                                                ? "#065f46"
                                                : "#991b1b",
                                        padding: "0.75rem",
                                        borderRadius: "4px",
                                        marginBottom: "1rem",
                                        border:
                                            pageMessage.type === "success"
                                                ? "1px solid #a7f3d0"
                                                : "1px solid #fecaca",
                                        fontWeight: "500"
                                    }}
                                >
                                    {pageMessage?.text}
                                </div>
                            )}
                            {showResendVerification && (
                                <button
                                    type="button"
                                    className="text-blue-600 underline mt-2"
                                    onClick={() => navigate("/resend-verification")}
                                >
                                    Request a new verification email
                                </button>
                            )}
                            <form className="auth-form" action={submitAction}>
                                <div className="auth-field">
                                    <label htmlFor="email">Email address</label>
                                    <input ref={userRef}
                                        type="email" name="email" id="email"
                                        placeholder="you@company.com"
                                        required
                                        value={user}
                                        onChange={(e) => setUser(e.target.value)}
                                    />
                                </div>
                                <div className="auth-field">
                                    <div className="auth-password-row">
                                        <label htmlFor="password">Password</label>
                                        <Link to="/forgot-password">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <input type="password" name="password"
                                        placeholder="Enter your password"
                                        id="password"
                                        required
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                    />
                                </div>
                                {formMessage && (
                                    <p
                                        ref={errRef}
                                        className={
                                            formMessage
                                                ? formMessage.type === "error"
                                                    ? "errmsg"
                                                    : "successmsg"
                                                : "offscreen"
                                        }
                                        aria-live="assertive"
                                    >
                                        {formMessage?.text}
                                    </p>
                                )}

                                {needsEmailVerification && (
                                    <button
                                        type="button"
                                        onClick={handleResendVerification}
                                        className="mt-3 text-sm underline"
                                    >
                                        Resend verification email
                                    </button>
                                )}
                                {/* 
                                {resendSent && (
                                    <p>
                                        A new verification email has been sent.
                                    </p>
                                )}
                                */}
                                <button type="submit" className="auth-submit-btn">
                                    {isPending === true ? 'Signing In..' : 'Sign In'}
                                </button>
                                <div className="persistCheck">
                                    <input
                                        type="checkbox"
                                        id="persist"
                                        onChange={togglePersist}
                                        checked={persist}
                                    />
                                    <label htmlFor="persist">Trust This Device</label>
                                </div>
                            </form>
                            {/*
                            <div className="auth-divider">
                                <span>OR</span>
                            </div>
                            
                            <button className="auth-google-btn">
                                Continue with Google
                            </button>
                            */}

                            <p className="auth-footer">
                                Don't have an account?
                                <Link to="/signup"> Start free trial</Link>
                            </p>
                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}