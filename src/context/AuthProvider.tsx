import { ReactNode, useState } from 'react'
import type { AuthData } from '../models/types'
import AuthContext from "./AuthContext"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<AuthData | null>(null)

    const [persist, setPersist] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false
        const savedValue = localStorage.getItem('persist')
        
        if (savedValue === null) {
            localStorage.setItem('persist', 'true')
            return true
        }
        return savedValue === 'true'
    })

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

