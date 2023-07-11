import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

export default function AddPlacePopup({
    isOpen,
    onClose,
    onAddPlace,
    isLoading
}) {
    const { values, handleChange, setValues } = useForm({});

    useEffect(() => {
        setValues({});
    }, [isOpen]);
   
    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace(values);
        setValues({});
    };

    return (
        <PopupWithForm
            name='place'
            title=' Новое место'
            buttonText={isLoading ? 'Создание...' : 'Создать'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label>
                <input
                    className="popup__input popup__input_value_title"
                    id="title__input"
                    type="text"
                    name="name"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    required
                    onChange={handleChange}
                    value={values.name || ''}
                />
                <span
                    className="popup__input-error"
                    id="title__input-error">
                </span>
            </label>
            <label>
                <input
                    className="popup__input popup__input_value_link"
                    id="link__input"
                    name="link"
                    placeholder="Ссылка на картинку"
                    type="url"
                    required
                    onChange={handleChange}
                    value={values.link || ''} />
                <span
                    className="popup__input-error"
                    id="link__input-error">
                </span>
            </label>
        </PopupWithForm>
    );
};