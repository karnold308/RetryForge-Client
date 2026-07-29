import { useEffect, useRef, useState } from "react"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useChangePassword } from "../hooks/dashboard/mutations"
import { AUTH_ERRORS } from "../models/types"

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

export default function ChangePasswordForm() {
    const errRef = useRef<HTMLParagraphElement | null>(null)

    const [currentPassword, setCurrentPassword] = useState("")

    const [newPassword, setNewPassword] = useState("")
    const [validNewPassword, setValidNewPassword] = useState(false)
    const [newPasswordFocus, setNewPasswordFocus] = useState(false)

    const [confirmPassword, setConfirmPassword] = useState("")
    const [validMatch, setValidMatch] = useState(false)
    const [confirmFocus, setConfirmFocus] = useState(false)

    const [formMessage, setFormMessage] = useState<{
        type: "success" | "error"
        text: string
    } | null>(null)

    const {
        mutate: changePassword,
        isPending,
    } = useChangePassword()

    useEffect(() => {
        setValidNewPassword(PWD_REGEX.test(newPassword))
        setValidMatch(newPassword === confirmPassword)
    }, [newPassword, confirmPassword])


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        changePassword(
            {
                currentPassword,
                newPassword,
            },
            {
                onSuccess: (response) => {
                    setCurrentPassword("")
                    setNewPassword("")
                    setConfirmPassword("")

                    setFormMessage({
                        type: "success",
                        text:
                            response.data.message ??
                            "Password updated successfully.",
                    })


                },

                onError: (error) => {
                    const code = error.response?.data?.code

                    if (code === AUTH_ERRORS.PASSWORD_SAME_AS_CURRENT) {
                        setFormMessage({
                            type: "error",
                            text: error.response?.data?.message ??
                                "Your new password must be different from your current password."
                        })

                        return
                    }

                    if (code === AUTH_ERRORS.CURRENT_PASSWORD_WRONG) {
                        setFormMessage({
                            type: "error",
                            text: error.response?.data?.message ??
                                "Your existing password is incorrect."
                        })

                        return
                    }

                    setFormMessage({
                        type: "error",
                        text: error.response?.data?.message ??
                            "Unable to change password.",
                    })

                    errRef.current?.focus()
                },
            }
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="signup-field">
                <label htmlFor="currentPassword">
                    Current Password
                </label>

                <input
                    id="currentPassword"
                    type="password"
                    autoComplete="current-password"
                    value={currentPassword}
                    onChange={(e) => {
                        setFormMessage(null)
                        setCurrentPassword(e.target.value)
                    }}
                    required
                />
            </div>

            <div className="signup-field">
                <label htmlFor="newPassword">
                    New Password

                    <span
                        className={
                            validNewPassword
                                ? "valid"
                                : "hide"
                        }
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </span>

                    <span
                        className={
                            validNewPassword || !newPassword
                                ? "hide"
                                : "invalid"
                        }
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>

                <input
                    id="newPassword"
                    type="password"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => {
                        setFormMessage(null)
                        setNewPassword(e.target.value)
                    }}
                    onFocus={() => setNewPasswordFocus(true)}
                    onBlur={() => setNewPasswordFocus(false)}
                    aria-invalid={
                        validNewPassword ? "false" : "true"
                    }
                    aria-describedby="pwdnote"
                    required
                />

                <p
                    id="pwdnote"
                    className={
                        newPasswordFocus &&
                            !validNewPassword
                            ? "instructions signUpInstructions"
                            : "offscreen"
                    }
                >
                    <FontAwesomeIcon
                        icon={faInfoCircle}
                    />
                    <br />
                    8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase
                    letters, a number and one special
                    character.
                </p>
            </div>

            <div className="signup-field">
                <label htmlFor="confirmPassword">
                    Confirm Password

                    <span
                        className={
                            validMatch &&
                                confirmPassword
                                ? "valid"
                                : "hide"
                        }
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </span>

                    <span
                        className={
                            validMatch || !confirmPassword
                                ? "hide"
                                : "invalid"
                        }
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>

                <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => {
                        setFormMessage(null)
                        setConfirmPassword(e.target.value)
                    }}
                    onFocus={() => setConfirmFocus(true)}
                    onBlur={() => setConfirmFocus(false)}
                    aria-invalid={
                        validMatch ? "false" : "true"
                    }
                    aria-describedby="confirmnote"
                    required
                />

                <p
                    id="confirmnote"
                    className={
                        confirmFocus && !validMatch
                            ? "instructions signUpInstructions"
                            : "offscreen"
                    }
                >
                    <FontAwesomeIcon
                        icon={faInfoCircle}
                    />
                    <br />
                    Must match the new password.
                </p>
            </div>

            <p
                ref={errRef}
                tabIndex={-1}
                className={
                    formMessage
                        ? formMessage.type === "error"
                            ? "errmsg"
                            : "successMsg"
                        : "offscreen"
                }
                aria-live="assertive"
            >
                {formMessage?.text}
            </p>

            <button
                className="signup-btn"
                type="submit"
                disabled={
                    !currentPassword ||
                    !validNewPassword ||
                    !validMatch ||
                    isPending
                }
            >
                {isPending
                    ? "Updating Password..."
                    : "Update Password"}
            </button>
        </form>
    )
}