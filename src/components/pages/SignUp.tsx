import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../../utils/analytics';
import { useActionState } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import '../../styles/SignUp.css'
import Footer from "../Footer";
import ScrollToTopBtn from "../ScrollToTopBtn";

const backendURL = import.meta.env.VITE_BACKEND_URL

const USER_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

type FormState = {
    loading: boolean
    message: string
    success: boolean
    data: {
        company: string,
        email: string,
        passW: string,
        matchPwd: string
    };
}



export default function SignUp() {
    const location = useLocation()
    const companyRef = useRef<HTMLInputElement | null>(null)
    const successRef = useRef<HTMLDivElement | null>(null)
    const errRef = useRef<HTMLParagraphElement | null>(null)

    const [user, setUser] = useState('')
    const [validUser, setValidUser] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        if (companyRef.current) {
            companyRef.current.focus()
        }
    }, [])

    useEffect(() => {
        setValidUser(USER_REGEX.test(user))
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd))
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    useEffect(() => {
        const pageTitle = document.title
        trackPageView(location.pathname, pageTitle)
    }, [location])




    async function submitAction(
        _prevState: FormState,
        formData: FormData
    ): Promise<FormState> {
        const email = formData.get("email") as string
        const company = formData.get("company") as string
        const pWord = formData.get("password") as string
        const matchPwd = formData.get("matchPwd") as string

        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry")
            if (errRef.current) {
                errRef.current.focus()
            }
            return {
                loading: false, message: "", success: false,
                data: { company: company, email: email, passW: pWord, matchPwd: matchPwd }
            };
        }

        if (!email.trim()) {
            setErrMsg("Email is required")
            if (errRef.current) {
                errRef.current.focus()
            }
            return {
                loading: false, message: "", success: false,
                data: { company: company, email: email, passW: pWord, matchPwd: matchPwd }
            };
        }

        if (!pWord.trim()) {
            setErrMsg("Password is required");
            if (errRef.current) {
                errRef.current.focus()
            }
            return {
                loading: false, message: "", success: false,
                data: { company: company, email: email, passW: pWord, matchPwd: matchPwd }
            };
        }

        try {
            const response = await fetch(`${backendURL}/register`, {
                method: "POST",
                body: JSON.stringify({ company, email, pwd }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 409) {
                setErrMsg("Email already exists");
                if (errRef.current) {
                    errRef.current.focus()
                }
                // email already exists
                return {
                    loading: false, message: '',
                    success: false, data: { company: company, email: email, passW: pwd, matchPwd: matchPwd }
                }
            }
            const result = await response.json()

            if (!response.ok) {
                setErrMsg("Submission failed")
                if (errRef.current) {
                    errRef.current.focus()
                }
                return {
                    loading: false, message: result.message || "Submission failed",
                    success: false,
                    data: {
                        company: result.data.company,
                        email: result.data.email,
                        passW: result.data.pwd,
                        matchPwd: result.data.pwd
                    }
                }
            }

            setUser('')
            setPwd('')
            setMatchPwd('')
            return {
                loading: false, message: result.message, success: true,
                data: result.data
            };
        } catch (err) {
            console.error(err)
            setErrMsg("Network error occured");
            if (errRef.current) {
                errRef.current.focus();
            }
            setUser(email)
            setPwd(pWord)
            setMatchPwd(matchPwd)

            return {
                loading: false, message: "Network error occured",
                success: false, data: { company: company, email: email, passW: pWord, matchPwd: matchPwd }
            }
        }
    }

    const [state, formAction, isPending] = useActionState(submitAction, {
        loading: false,
        message: "",
        success: false,
        data: { company: '', email: '', passW: '', matchPwd: '' },
    });

    useEffect(() => {
        if (state.success === true) {
            if (successRef.current) {
                successRef.current.scrollIntoView({ block: 'end' });
            }
        }
    }, [state.success])

    return (
        <>
            <title>RetryForge - Sign Up</title>
            <main className="signup-page px-6 pb-16">
                <section className="signup-layout pb-24 border-t border-gray-200/70">
                    {state.success ? (
                        <div ref={successRef} className="signup-card signUpSuccessMsg">
                            <h1>Success!</h1>
                            <p className="successMsg">{state.message}</p>
                            <p>
                                <span className="linkText">
                                    <Link to="/login">Sign In</Link>
                                </span>
                            </p>
                        </div>
                    ) : (

                        <div className="signup-card">
                            <div className="signup-card-header">
                                <span className="signup-badge">
                                    Start recovering failed payments
                                </span>
                                <h1>Create your account</h1>
                                <p>
                                    Connect Stripe and start tracking recoverable revenue in
                                    minutes.
                                </p>
                            </div>
                            <form className="signup-form" action={formAction} name="signup-form">
                                <div className="signup-field focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                    <label htmlFor="company">Company name</label>
                                    <input
                                        ref={companyRef}
                                        name="company"
                                        id="company"
                                        type="text"
                                        placeholder="Acme Inc."
                                        defaultValue={
                                            (state.data?.company)
                                        } />
                                </div>
                                <div className="signup-field">
                                    <label htmlFor="email">Work email
                                        <span className={validUser ? "valid" : "hide"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span className={validUser || !user ? "hide" : "invalid"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </label>
                                    <input
                                        className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        name="email"
                                        id="email"
                                        type="text"
                                        required
                                        autoComplete="off"
                                        value={user}
                                        onChange={(e) => setUser(e.target.value)}
                                        aria-invalid={validUser ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setUserFocus(true)}
                                        onBlur={() => setUserFocus(false)}
                                        placeholder="you@company.com" />
                                    <p id="uidnote" className={userFocus && user && !validUser ?
                                        "instructions signUpInstructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Email format with @, a domain, and a .
                                    </p>
                                </div>
                                <div className="signup-field">
                                    <label htmlFor="password">Password
                                        <span className={validPwd ? "valid" : "hide"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </label>
                                    <input
                                        name="password"
                                        id="password"
                                        type="password"
                                        value={pwd}
                                        required
                                        placeholder="Create a password"
                                        aria-invalid={validPwd ? "false" : "true"}
                                        aria-describedby="pwdnote"
                                        onFocus={() => setPwdFocus(true)}
                                        onBlur={() => setPwdFocus(false)}
                                        onChange={(e) => setPwd(e.target.value)} />
                                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions signUpInstructions" :
                                        "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        8 to 24 characters.<br />
                                        Must include uppercase and lowercase letters, a number and a special character. <br />
                                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                    </p>

                                </div>

                                <div className="signup-field">
                                    <label htmlFor="confirm_pwd">Confirm Password
                                        <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </label>
                                    <input
                                        name="matchPwd"
                                        id="confirm_pwd"
                                        type="password"
                                        required
                                        value={matchPwd}
                                        placeholder="Retype password"
                                        aria-invalid={validMatch ? "false" : "true"}
                                        aria-describedby="confirmnote"
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)}
                                        onChange={(e) => setMatchPwd(e.target.value)}
                                    />
                                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions signUpInstructions" :
                                        "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Must match the first password input field.
                                    </p>

                                </div>
                                <p ref={errRef} className={errMsg ? 'errmsg' : 'successMsg offscreen'} aria-live="assertive">
                                    {state.success === false ?
                                        ' ' !== errMsg ? errMsg : state.message
                                        :
                                        state.message
                                    }
                                </p>
                                <button type="submit" className="signup-btn"
                                    disabled={!validUser || !validPwd || !validMatch ? true : false}>
                                    {isPending === true ? 'Creating Account...' : 'Create Account'}
                                </button>
                            </form>
                            <p>
                                <br />Already registered? <br />
                                <span className="linkText">
                                    <Link to="/login">Sign In</Link>
                                </span>
                            </p>
                            <p className="signup-footer-text">
                                By creating an account, you agree to our{" "}
                                <Link to="/terms">Terms</Link> and{" "}
                                <Link to="/privacy">Privacy Policy</Link>.
                            </p>
                        </div>
                    )}

                    {/* RIGHT SIDE */}
                    <div className="signup-info-panel">
                        <div className="signup-info-card">
                            <h2>What happens next</h2>
                            <ul className="signup-checklist">
                                <li>Connect Stripe securely</li>
                                <li>RetryForge analyzes failed subscription payments</li>
                                <li>Configure retry timing and recovery workflows</li>
                                <li>Start recovering revenue automatically</li>
                            </ul>
                        </div>

                        <div className="signup-mini-card">
                            <span className="signup-mini-label">
                                Typical setup time
                            </span>
                            <strong>5-10 minutes</strong>
                            <p>
                                No billing migration or major code changes required.
                            </p>
                        </div>

                        <div className="signup-mini-card">
                            <span className="signup-mini-label">
                                Built for Stripe Billing
                            </span>
                            <p>
                                Works alongside your existing subscription setup and
                                payment workflows.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <ScrollToTopBtn />
            <Footer />
        </>
    )
}