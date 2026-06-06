import Hero from "./Hero"
import Calculator from "./Calculator"
import Problem from "./Problem"
import Solution from "./Solution"
import HowItWorks from "./HowItWorks"
import Comparisons from "./Comparisons"
import FinalCall from "./FinalCall"
import MainPricing from "./MainPricing"
import { FAQ } from "./FAQ"
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../utils/analytics'
import RecoveryFlow from "./RecoveryFlow"
import Pilot from "./Pilot"
import FounderPresence from "./FounderPresence"
import { isAuthenticated } from "../utils/authUtility"
import useAuth from "../hooks/useAuth"


export default function Main() {
    const location = useLocation()
    const { auth } = useAuth()
    const loggedIn = isAuthenticated(auth) && null !== auth ? auth.accessToken !== '' : false
    const { hash } = useLocation()

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''))
            if (element) {
                window.scroll({ top: element.offsetTop + 200 })
            }
        }
    }, [hash])

    useEffect(() => {
        // Track page view on route change
        const pageTitle = document.title
        trackPageView(location.pathname, pageTitle)
    }, [location])

    return (
        <main>
            <Hero />
            <Calculator />
            <Problem />
            <Solution />
            <HowItWorks />
            <RecoveryFlow />
            <Comparisons />
            {loggedIn ? <></>
                :
                <>
                    <Pilot />
                    <MainPricing />
                </>}
            <FAQ />
            <FounderPresence />
            {/* <SocialProof /> */}
            {loggedIn ? <></>
                : <FinalCall />}
        </main>
    )
}

