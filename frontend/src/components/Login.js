import React, { useState } from 'react';
import AuthForm from './AuthForm';

export default function Login({ onLogin }) {
    const [loginUserInfo, setLoginUserInfo] = useState({
        email: '',
        password: '',
    });

    function handleChange(evt) {
        const { value, name } = evt.target;
        setLoginUserInfo((values) => ({ ...values, [name]: value }))
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        onLogin({
            email: loginUserInfo.email,
            password: loginUserInfo.password,
        });
    };

    return (
        <div className="auth">
            <AuthForm
                name={"login"}
                title={"Вход"}
                buttonText={"Войти"}
                onSubmit={handleSubmit}>
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
                    value={loginUserInfo.email || ''}
                />
                <span
                    className="popup__input-error"
                    id="email__input-error"></span>
                <input
                    className="auth__input auth__input_value_password"
                    id="password__input"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    minLength="8"
                    maxLength="40"
                    required
                    onChange={handleChange}
                    value={loginUserInfo.password || ''}
                />
                <span
                    className="popup__input-error"
                    id="password__input-error"></span>
            </AuthForm>
        </div>
    );
};