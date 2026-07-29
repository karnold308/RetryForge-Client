// src/context/IdleTimeoutProvider.tsx
import React, { useEffect, useRef, useCallback } from 'react'
import useAuth from '../hooks/useAuth'
import useLogout from '../hooks/useLogout'
import { isAuthenticated } from '../utils/authUtility'
import { useQueryClient } from "@tanstack/react-query"

interface IdleTimeoutProviderProps {
    children: React.ReactNode
    timeoutInMinutes?: number
}

export function IdleTimeoutProvider({ children, timeoutInMinutes = 30 }: IdleTimeoutProviderProps) {
    const { auth } = useAuth()
    const logout = useLogout()
    const isLoggingOutRef = useRef(false)
    const queryClient = useQueryClient()

    const timeoutMs = timeoutInMinutes * 60 * 1000
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const tokenRef = useRef<string | null>(null)

    useEffect(() => {
        tokenRef.current = auth?.accessToken || null
    }, [auth?.accessToken])

    // Core logout routine executed when the idle clock runs out
    const handleIdleLogout = useCallback(async () => {
        if (!tokenRef.current) return
        if (isLoggingOutRef.current) return
        if (!tokenRef.current) return
        try {
            isLoggingOutRef.current = true
            await logout(true)
            queryClient.invalidateQueries({ queryKey: ["me"] })
        } finally {
            isLoggingOutRef.current = false
        }

    }, [logout])

    //  Resets the inactivity clock whenever a user action is detected
    const resetTimer = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current)

        // Check the live mutable ref here as well
        if (tokenRef.current) {
            timerRef.current = setTimeout(handleIdleLogout, timeoutMs)
        }
    }, [handleIdleLogout, timeoutMs])

    useEffect(() => {
        // Only attach event tracking overhead if a user is actively logged in
        if (!isAuthenticated(auth)) {
            if (timerRef.current) clearTimeout(timerRef.current)
            return
        }

        // Standard human activity indicators
        const activityEvents = [
            'mousedown',
            'keypress',
            'scroll',
            'touchstart'
        ]

        // Bind reset listener to each event type
        activityEvents.forEach(event => {
            window.addEventListener(event, resetTimer)
        })

        // Initialize clock on mount or auth token generation pass
        resetTimer()

        // Cleanup: remove standard listeners and clear active macros on unmount/re-auth
        return () => {
            activityEvents.forEach(event => {
                window.removeEventListener(event, resetTimer)
            })
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [auth?.accessToken, resetTimer])

    return <>{children}</>
}
