import { Analytics } from '@vercel/analytics/react';

import Footer from "./components/Footer";
import Main from "./components/Main";
import Navbar from "./components/Navbar";


function App() {
    return (
        <>
            <Navbar />
            <Main />
            <Footer />
            <Analytics />
        </>

    )
}

export default App