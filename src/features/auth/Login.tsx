import "../../styles/Login.css"
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, Link, useSearchParams } from 'react-router-dom'
import { trackPageView } from '../../utils/analytics'
import { useActionState } from 'react'
import useAuth from "../../hooks/useAuth"
import axios from '../../api/axios'
import { AxiosError } from 'axios'
import { FormState } from "../../models/types"
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
    const [errMsg, setErrMsg] = useState('')
    const redirectTargetRef = useRef<string>("/dashboard")
    const queryClient = useQueryClient()

    const [searchParams] = useSearchParams()
    const showTimeoutNotice = location.state?.reason === 'timeout'

    useEffect(() => {
        if (userRef.current) userRef.current.focus()
        const fromLocation = location.state?.from
        if (fromLocation) {
            const fullPath = `${fromLocation.pathname}${fromLocation.search || ''}`
            redirectTargetRef.current = fullPath
        }

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
        setErrMsg('')
    }, [user, pwd])

    const togglePersist = () => {
        setPersist((prev) => {
            const nextValue = !prev
            localStorage.setItem("persist", String(nextValue))
            return nextValue
        })
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
            const error = err as AxiosError

            setErrMsg(error.message)

            if (!error.response) {
                setErrMsg("No Server Response")
            } else if (error.response?.status === 400) {
                setErrMsg("Missing Email or Password")
            } else if (error.response?.status === 401) {
                setErrMsg("Unauthorized")
            } else {
                setErrMsg("Login Failed")
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


    return (
        <>
            <title>RetryForge - Login</title>
            <main>
                <div className="auth-page">
                    <div className="auth-shell">
                        <div className="auth-brand">
                            <Link to="/" className="logo">
                                <img
                                    src="/full_logo_with_name_2.png"
                                    alt="RetryForge"
                                    className="auth-logo"
                                />
                            </Link>
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
                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
                                    aria-live="assertive">{errMsg}</p>

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

                            <div className="auth-divider">
                                <span>OR</span>
                            </div>

                            <button className="auth-stripe-btn">
                                Continue with Stripe
                            </button>

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