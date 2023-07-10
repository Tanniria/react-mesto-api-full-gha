import React from "react";
import iconSuccess from "../images/iconSuccess.svg";
import iconUnsuccess from "../images/iconUnsuccess.svg";
import usePopupClose from '../hooks/usePopupClose';

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  usePopupClose(isOpen, onClose);
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ''}`}>
      <div className="popup__container">
        <div className="popup_event">
          <h2 className="popup_event-title">
            {`${isSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}`}
          </h2>
          <img
            className="popup_event-icon"
            src={`${isSuccess
              ? iconSuccess
              : iconUnsuccess}`}
            alt={`${isSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}`} />
        </div>
        <button
          className="popup__button-close"
          type="button"
          aria-label="Выход"
          onClick={onClose} />
      </div>
    </div>
  );
};