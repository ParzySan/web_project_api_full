import React, { useState, useEffect } from "react";
import Main from "./main/Main.jsx";
import Header from "./header/Header.jsx";
import Footer from "./footer/Footer.jsx";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip.jsx";
import * as auth from "../utils/auth.js";

import { useLocation } from "react-router-dom";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [popup, setPopup] = useState(null);
  const handleOpenPopup = (popupContent) => {
    setPopup(popupContent);
  };
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClosePopup = () => {
    setPopup(null);
  };
  useEffect(() => {
    api
      .fetchCards()
      .then((data) => {
        if (data) {
          setCards(data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener las tarjetas:", error);
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error("Error al obtener la información del usuario:", err);
      });
  }, []);

  const handleUpdateUser = (data) => {
    (async () => {
      await api
        .setUserInfo(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  const handleUpdateAvatar = (data) => {
    api
      .setUserAvatar(data)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
      })
      .catch((error) => console.error("Error al actualizar avatar:", error));
  };

  async function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya les has dado like
    const isLiked = card.likes.some(
      (userId) =>
        userId === currentUser._id ||
        (userId._id && userId._id === currentUser._id)
    );

    // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.error("Error al eliminar la tarjeta:", err);
      });
  }
  function handleAddPlaceSubmit(newCardData) {
    api
      .addCard(newCardData)
      .then((newCard) => {
        setCards([newCard, ...cards]); // agrega la nueva al principio
        handleClosePopup();
      })
      .catch((err) => console.error("Error al agregar tarjeta:", err));
  }

  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/"); // ir a la ruta protegida
      })
      .catch((err) => {
        console.error("Login fallido:", err.message);
        setIsTooltipOpen(true);
        setIsSuccess(false);
      });
  };

  const handleRegister = ({ email, password }) => {
    auth
      .register(email, password)
      .then((res) => {
        setIsSuccess(true);
        setIsTooltipOpen(true);
        navigate("/signup");
      })
      .catch((err) => {
        console.error("Registro fallido:", err.message);
        setIsSuccess(false);
        setIsTooltipOpen(true);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.email);
        })
        .catch((err) => {
          console.error("Token inválido:", err.message);
          setLoggedIn(false);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}
    >
      <InfoTooltip
        isOpen={isTooltipOpen}
        onClose={() => setIsTooltipOpen(false)}
        isSuccess={isSuccess}
      />

      {/* <InfoTooltip isOpen={true} onClose={() => {}} isSuccess={false} /> */}
      <Routes>
        {/* Ruta por defecto si no hay match */}
        <Route path="/signup" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/signin"
          element={<Register onRegister={handleRegister} />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute loggedIn={isLoggedIn}>
              <div className="container">
                <button className="header__menu-icon" onClick={toggleMenu}>
                  {isMenuOpen ? "" : "☰"}
                </button>
                {isMenuOpen && (
                  <>
                    <button
                      className="header__menu-icon-x"
                      onClick={toggleMenu}
                    >
                      {isMenuOpen ? "✕" : ""}
                    </button>
                    <div className="header__mobile-menu">
                      <p className="header__email">{userEmail}</p>
                      <button className="header__logout">Cerrar sesión</button>
                    </div>
                  </>
                )}

                <nav className="header__nav">
                  <p className="header__email">email@mail.com</p>
                  <p className="header__logout">Cerrar sesión</p>
                </nav>

                <Header className="header" />
                <Main
                  className="main"
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onAddPlaceSubmit={handleAddPlaceSubmit}
                />
                <Footer className="footer" />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/signup"} replace />}
        />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
