import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { trackPageView } from "../../utils/analytics"
import { useResetPassword } from "../../hooks/dashboard/mutations"
import RequestPasswordResetForm from "../RequestPasswordResetForm"
import { AUTH_ERRORS } from "../../models/types"

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

type ResetPasswordMode =
    | "form"
    | "invalid"
    | "expired"
    | "same"

export default function ResetPassword() {
    const location = useLocation()
    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)
    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const errRef = useRef<HTMLParagraphElement | null>(null)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const token = searchParams.get("token")

    const {
        mutate: resetPassword,
        isPending,
        isSuccess,
        isError,
        data,
        error
    } = useResetPassword()

    const [mode, setMode] = useState<ResetPasswordMode>("form")

    const [pageMessage, setPageMessage] = useState<{
        type: "success" | "error"
        text: string
    } | null>(null)

    useEffect(() => {
        if (!token) {
            setPageMessage({
                type: "error",
                text: "This password reset link is invalid."
            })
            setMode("invalid")
        }
    }, [token])



    const handleResetPasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const tmpToken = searchParams.get("token")

        if (!tmpToken) {
            setPageMessage({
                type: "error",
                text: "This password reset link is invalid."
            })

            return
        }
        resetPassword({ token: tmpToken, password: pwd },
            {
                onSuccess: () => {
                    navigate("/login?passwordReset=success")
                },

                onError: (error) => {
                    const code = error.response?.data?.code

                    if (code === AUTH_ERRORS.RESET_TOKEN_INVALID) {
                        setMode("invalid")

                        setPageMessage({
                            type: "error",
                            text: "This password reset link is invalid."
                        })

                        return
                    }

                    if (code === AUTH_ERRORS.RESET_TOKEN_EXPIRED) {
                        setMode("expired")

                        setPageMessage({
                            type: "error",
                            text: "This password reset link has expired."
                        })

                        return
                    }

                    if (code === AUTH_ERRORS.PASSWORD_SAME_AS_CURRENT) {
                        setMode("same")
                        setPageMessage({
                            type: "error",
                            text: "Your new password must be different from your current password."
                        })

                        return
                    }


                    setErrMsg(
                        error.response?.data?.message ??
                        "Unable to reset password."
                    )
                }
            })
    }

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd))
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [pwd, matchPwd])

    useEffect(() => {
        const pageTitle = document.title
        trackPageView(location.pathname, pageTitle)
    }, [location])

    {
        return (
            mode === "form" || mode === "same" ? (
                <>
                    <title>RetryForge - Reset Password</title>
                    <main className="px-6 pt-12 xs:max-w-72">
                        {pageMessage && (
                        <div className="errmsg">
                            {pageMessage.text}
                        </div>
                    )}
                        <div className="signup-field xs:max-w-72">
                            <form onSubmit={handleResetPasswordSubmit}>
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

                                <div className="signup-field pt-4">
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
                                <button type="submit" className="signup-btn"
                                    disabled={!validPwd || !validMatch ? true : false}>
                                    {isPending === true ? 'Reseting Password...' : 'Reset Password'}
                                </button>
                            </form>
                        </div>
                    </main>
                </>
            ) : (
                <div className="px-6 pt-12 xs:max-w-72">
                    {pageMessage && (
                        <div className="errmsg">
                            {pageMessage.text}
                        </div>
                    )}

                    <RequestPasswordResetForm heading="Request another password reset email" />

                </div>
            )
        )
    }
}