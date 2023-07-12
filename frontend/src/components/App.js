import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from '../utils/api';
import * as auth from '../utils/auth';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ConfirmPopup from "./ConfirmPopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";

export default function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [userEmail, setUserEmail] = useState('');

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (loggedIn) {
    //         Promise.all([api.getUserInfo(), api.getInitialCards()])
    //             .then(([userInfo, cards]) => {
    //                 setCurrentUser(userInfo);
    //                 setCards(cards);
    //             })
    //             .catch((err) => {
    //                 console.log(`Ошибка: ${err}`)
    //             })
    //     }
    // }, [loggedIn]);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
          if(loggedIn) {
            api
              .getInfo()
              .then(([userInfo, card]) => {
                setCurrentUser(userInfo);
                setCards(card.reverse());
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      }, [loggedIn]);
    

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    };
    function handleCardClick(card) {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    };
    function handleDeleteIcon(card) {
        setSelectedCard(card);
        setIsConfirmPopupOpen(true);
    };
    function handleInfoTooltipClick() {
        setIsInfoTooltipPopupOpen(true);
    };
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setIsConfirmPopupOpen(false);
        setIsInfoTooltipPopupOpen(false);
    };

    function handleRegistration(email, password) {
        auth
            .register(email, password)
            .then((res) => {
                setRegistrationSuccess(true);
                handleInfoTooltipClick();
                navigate("/sign-in", { replace: true });
            })
            .catch((err) => {
                setRegistrationSuccess(false);
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                handleInfoTooltipClick(true);
            })
    }

    function handleLogin(data) {
        return auth
            .login(data)
            .then((data) => {
                localStorage.setItem("jwt", data.token);
                setLoggedIn(true);
                handleTokenCheck();
                navigate("/");
            })
            .catch((err) => {
                setRegistrationSuccess(false);
                handleInfoTooltipClick(true);
                console.log(`Ошибка: ${err}`);
            })
    }

    function handleTokenCheck() {
        const token = localStorage.getItem("jwt");
        if (token) {
            auth
                .checkToken(token)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        setUserEmail(res.data.email)
                        navigate('/', { replace: true });
                    }
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                })
        }
    }
    useEffect(() => {
        handleTokenCheck();
    }, [navigate]);

    useEffect(() => {
        loggedIn && navigate('/');
    }, [loggedIn])

    function handleSingOut() {
        localStorage.removeItem("jwt");
        setLoggedIn(false);
        setUserEmail('');
        navigate("/sign-in");
    }

    function handleUpdateUser(data) {
        setIsLoading(true);
        api
            .editUserInfo(data)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            })
            .finally(() => {
                setIsLoading(false);
            })
    };
    function handleUpdateAvatar(data) {
        setIsLoading(true);
        api
            .editAvatar(data)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            })
            .finally(() => {
                setIsLoading(false);
            })
    };
    function handleAddPlaceSubmit(card) {
        setIsLoading(true);
        api
            .addCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            })
            .finally(() => setIsLoading(false));
    };
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            })
    };
    function handleCardDelete() {
        setIsLoading(true);
        api
            .deleteCard(selectedCard._id)
            .then(() => {
                setCards((cards) =>
                    cards.filter((item) => item._id !== selectedCard._id));
            })
            .then(() => closeAllPopups())
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            })
            .finally(() => setIsLoading(false))
    }
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    loggedIn={loggedIn}
                    userEmail={userEmail}
                    onSignOut={handleSingOut} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute
                                element={Main}
                                loggedIn={loggedIn}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleDeleteIcon}
                                cards={cards}
                            />
                        } />
                    <Route
                        path="/sign-in"
                        element={<Login onLogin={handleLogin} />} />
                    <Route
                        path="/sign-up"
                        element={<Register onRegister={handleRegistration} />} />
                </Routes>
                <Footer loggedIn={loggedIn} />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading} />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading} />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoading={isLoading} />
                <ConfirmPopup
                    isOpen={isConfirmPopupOpen}
                    onClose={closeAllPopups}
                    onConfirm={handleCardDelete}
                    isLoading={isLoading} />
                <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups} />
                <InfoTooltip
                    isOpen={isInfoTooltipPopupOpen}
                    onClose={closeAllPopups}
                    isSuccess={registrationSuccess} />
            </div>
        </CurrentUserContext.Provider>
    );
};