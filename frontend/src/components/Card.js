import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({
    card,
    onCardClick,
    onCardLike,
    onCardDelete
}) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;

    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    const cardLikeButtonClassName = `feed__button-like ${isLiked && 'feed__button-like_active'}`;

    function handleClick() {
        onCardClick(card);
    };
    function handleCardLike() {
        onCardLike(card);
    };
    function handleCardDelete() {
        onCardDelete(card);
    };

    return (
        <li className="feed__item">
            {isOwn && (
                <button
                    className="feed__button-delete"
                    type="button"
                    aria-label="Удалить"
                    onClick={handleCardDelete}></button>
            )}
            <img className="feed__img"
                src={card.link}
                alt={card.name}
                onClick={handleClick} />
            <div className="feed__overview">
                <h2 className="feed__title">{card.name}</h2>
                <div className="feed__like-container">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        aria-label="Лайк"
                        onClick={handleCardLike}></button>
                    <p
                        className="feed__like-counter">
                        {card.likes.length}
                    </p>
                </div>
            </div>
        </li>
    );
};