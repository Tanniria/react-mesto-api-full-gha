import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function ConfirmPopup({
    isOpen,
    onClose,
    onConfirm,
    isLoading,
    card
}) {
    function handleSubmit(evt) {
        evt.preventDefault();
        onConfirm(card);
    };

    return (
        <PopupWithForm
            title='Вы уверены?'
            name='delete'
            buttonText={isLoading ? 'Удаление...' : 'Да'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit} />
    );
};