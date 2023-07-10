import React, { useState } from "react";
import AuthForm from './AuthForm';

export default function Register({ onRegister }) {
    const [registrationUserInfo, setRegistrationUserInfo] = useState({
        email: '',
        password: '',
    });

    function handleChange(evt) {
        const { value, name } = evt.target;
        setRegistrationUserInfo({ ...registrationUserInfo, [name]: value })
    };
    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister(registrationUserInfo)
    }

    return (
        <div className="auth">
            <AuthForm
                name={"register"}
                title={"Регистрация"}
                buttonText={"Зарегистрироваться"}
                onSubmit={handleSubmit}
                register>
                <input
                    className="auth__input auth__input_value_email"
                    id="email__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    minLength="2"
                    maxLength="40"
                    required
                    autoComplete="off"
                    onChange={handleChange}
                    value={registrationUserInfo.email} />
                <span
                    className="popup__input-error"
                    id="email__input-error"></span>
                <input
                    className="auth__input auth__input_value_password"
                    id="password__input"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    minLength="7"
                    maxLength="40"
                    onChange={handleChange}
                    value={registrationUserInfo.password}
                />
                <span
                    className="popup__input-error"
                    id="password__input-error"></span>
            </AuthForm>
        </div>
    );
};