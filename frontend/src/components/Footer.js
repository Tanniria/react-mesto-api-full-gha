import React from "react"

export default function Footer() {
    const setYear = () => {
        return new Date().getFullYear();
    };
    return (
        <footer className="footer">
            <p className="footer__copyright">&copy; {setYear()} Mesto Russia</p>
        </footer>
    );
};