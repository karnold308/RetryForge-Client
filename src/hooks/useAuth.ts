import { useDebugValue, useContext } from "react"
import AuthContext from "../context/AuthContext"
import { AuthContextType } from "../models/types"


const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    useDebugValue(context.auth, (auth) => (auth?.accessToken ? 'Logged In' : 'Logged Out'))

    return context
}

export default useAuth
