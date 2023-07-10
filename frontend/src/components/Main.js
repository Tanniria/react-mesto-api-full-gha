import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete,
    cards
}) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__container-avatar">
                    <button
                        className="profile__button-avatar"
                        type="button"
                        aria-label="Кнопка редактирования аватара"
                        onClick={onEditAvatar}>
                    </button>
                    <img
                        className="profile__avatar"
                        src={currentUser.avatar}
                        alt='Аватар' />
                </div>
                <div className="profile__form">
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            className="profile__button-edit"
                            type="button"
                            aria-label="Редактировать"
                            onClick={onEditProfile}></button>
                    </div>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
                <button className="profile__button-add"
                    type="button"
                    aria-label="Добавить"
                    onClick={onAddPlace}></button>
            </section>
            <section className="feed">
                <ul className="feed__list">
                    {cards.map((card) => (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete} />
                    ))};
                </ul>
            </section>
        </main>
    );
};