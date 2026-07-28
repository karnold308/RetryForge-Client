import { useState } from "react"
import { useForgotPassword } from "../hooks/dashboard/mutations"

interface Props {
    heading?: string
}

export default function RequestPasswordResetForm({
    heading
}: Props) {
    const [email, setEmail] = useState("")

    const {
            mutate: forgotPassword,
            isPending,
            isSuccess,
            isError,
            data,
            error
        } = useForgotPassword()

    
    const handleSubmit = () => {
        forgotPassword(email)
    }

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}>
                {heading && <h2>{heading}</h2>}
                <div className="signup-field xs:max-w-72">
                    <label htmlFor="email">
                        Email:
                    </label>
                    <input
                        id="email"
                        autoComplete="off"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text" />

                    <button
                        className="nav-btn-secondary border border-gray-300 px-5 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending
                            ? "Sending Instructions..."
                            : "Send Password Reset Email"}
                    </button>
                </div>
            </form>
            {isSuccess && (
                <p className="text-green-600 mt-4">
                    {data?.data.message}
                </p>
            )}
            {isError && (
                <p className="text-red-600 mt-4">
                    {error.response?.data?.message ?? "Something went wrong."}
                </p>
            )}
        </>
    )
}

