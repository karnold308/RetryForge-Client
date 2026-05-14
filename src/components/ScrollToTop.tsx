import { useState, useEffect } from "react";

function ScrollToTopBtn() {
    const [showScrollBtn, setShowScrollBtn] = useState(false);


    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    function handleScroll() {
        setShowScrollBtn(window.scrollY > 0);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <button
            className={showScrollBtn ? "btn-visible" : "btn-hidden"}
            onClick={() => scrollToTop()}
        >
        </button>
    );
}

export default ScrollToTopBtn;