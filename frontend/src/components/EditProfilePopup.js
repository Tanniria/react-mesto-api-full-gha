import React, { useContext, useEffect } from 'react'
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from '../hooks/useForm';

export default function EditProfilePopup({
    isOpen,
    onClose,
    onUpdateUser,
    isLoading
}) {
    const currentUser = useContext(CurrentUserContext);
    const { values, handleChange, setValues } = useForm({});

    useEffect(() => {
        isOpen &&
            setValues({
                name: currentUser.name,
                job: currentUser.about,
            });
    }, [currentUser, isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser(values);
    };

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit} >
            <label>
                <input
                    className="popup__input popup__input_value_name"
                    id="name__input"
                    type="text"
                    name="name"
                    placeholder="Имя"
                    minLength="2"
                    maxLength="40"
                    required
                    onChange={handleChange}
                    value={values.name || ''} />
                <span
                    className="popup__input-error"
                    id="name__input-error"></span>
            </label>
            <label>
                <input
                    className="popup__input popup__input_value_job"
                    id="job__input"
                    type="text"
                    name="job"
                    placeholder="О себе"
                    minLength="2"
                    maxLength="200"
                    required
                    onChange={handleChange}
                    value={values.job || ''} />
                <span
                    className="popup__input-error"
                    id="job__input-error"></span>
            </label>
        </PopupWithForm>
    );
};