import React from "react";
import usePopupClose from '../hooks/usePopupClose';

export default function PopupWithForm({ isOpen, onClose, onSubmit, name, title, buttonText, children }) {
    usePopupClose(isOpen, onClose);
    return (
        <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <form className={`popup__form popup__form_${name}`}
                    name={name}
                    method="post"
                    onSubmit={onSubmit}>
                    {children}
                    <button
                        className="popup__button-save"
                        type="submit"
                        aria-label="Сохранить">
                        {`${buttonText || 'Сохранить'}`}</button>
                </form>
                <button
                    className="popup__button-close"
                    type="button"
                    aria-label="Выход"
                    onClick={onClose} />
            </div>
        </div>
    );
};