import React, { useContext, useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditAvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar,
    isLoading
}) {
    const currentUser = useContext(CurrentUserContext);
    const avatarRef = useRef(currentUser.avatar);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        })
    };
    useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <label>
                <input
                    className="popup__input popup__input_value_avatar"
                    id="avatar__input"
                    name="avatar"
                    placeholder="Введите ссылку"
                    type="url"
                    required
                    ref={avatarRef}
                />
                <span
                    className="popup__input-error"
                    id="avatar__input-error"></span>
            </label>
        </PopupWithForm>
    );
};