import React from "react";
import { useLocation, Link, Routes, Route } from "react-router-dom";
import logo from '../images/logo.svg';

export default function Header({ userEmail, onSignOut, loggedIn }) {
    const location = useLocation();
    
    const link = location.pathname === "/sign-in" ? "Регистрация" : "Войти";
    const buttonText = loggedIn ? "Выйти" : link;

    return (
        <header className="header">
            <div className="header__container">
                <img
                    src={logo}
                    className="header__logo"
                    alt="Логотип с надписью Место" />
                <Routes>
                    <Route path="/"
                        element={
                            <div>
                                <nav className="header__nav">
                                    <p className="header__email">{userEmail}</p>
                                    <button
                                        className="header__button-signout"
                                        onClick={onSignOut}>
                                        {buttonText}
                                    </button>
                                </nav>
                            </div>
                        } />
                    <Route path="/sign-in"
                        element={
                            <Link to="/sign-up" className="header__button-link">Регистрация</Link>} />
                    <Route path="/sign-up"
                        element={
                            <Link to="/sign-in" className="header__button-link">Войти </Link>} />
                </Routes>
            </div>
        </header>
    );
};