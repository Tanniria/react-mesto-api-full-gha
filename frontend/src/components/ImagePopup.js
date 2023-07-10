import React from "react";
import usePopupClose from '../hooks/usePopupClose';

export default function ImagePopup({ card, isOpen, onClose }) {
    usePopupClose(isOpen, onClose);
    return (
        <div className={`popup popup_img ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container-img">
                <h2 className="popup__img-title">{card.name}</h2>
                <img className="popup__img-zoom"
                    src={card.link}
                    alt={card.name} />
                <button className="popup__button-close"
                    type='button'
                    aria-label="Закрыть"
                    onClick={onClose}></button>
            </div>
        </div>
    );
};