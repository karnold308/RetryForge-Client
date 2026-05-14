import { Analytics } from '@vercel/analytics/react';

import Footer from "./components/Footer";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import ScrollToTopBtn from './components/ScrollToTop';


function App() {
    const isProduction = import.meta.env.VITE_VERCEL_ENV === 'production';
    return (
        <>
            <Navbar />
            <Main />
            <ScrollToTopBtn />
            <Footer />
            {isProduction && <Analytics />}
        </>

    )
}

export default App