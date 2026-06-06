import { Analytics } from '@vercel/analytics/react';

import Footer from "./components/Footer";
import Main from "./components/Main";
import ScrollToTopBtn from './components/ScrollToTopBtn';


function App() {
    const isProduction = import.meta.env.VITE_VERCEL_ENV === 'production';
    return (
        <>
            <Main />
            <ScrollToTopBtn />
            <Footer />
            {isProduction && <Analytics />}
        </>

    )
}

export default App