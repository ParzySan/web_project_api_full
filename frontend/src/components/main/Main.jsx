import editimg from "../../images/Edit_Button.png";
import addimg from "../../images/Add_Button.png";

import Card from "../card/Card";
import NewCard from "../form/newCard/NewCard";
import EditAvatar from "../form/editAvatar/EditAvatar";
import EditProfile from "../form/editProfile/EditProfile";
import Popup from "./componentes/Popup/Popup";
import ImagePopup from "../ImagePopup/ImagePopup";
import React, { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
  onClosePopup,
}) {
  // const { onClosePopup } = props;

  const [popup, setPopup] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const newCardPopup = {
    title: "Nuevo lugar",
    children: (
      <NewCard onClose={handleClosePopup} onAddPlaceSubmit={onAddPlaceSubmit} />
    ),
  };
  const editAvatarPopup = {
    title: "Nuevo avatar",
    children: <EditAvatar onClose={handleClosePopup} />,
  };
  const editProfilerPopup = {
    title: "Nuevo Nombre",
    children: <EditProfile onClose={handleClosePopup} />,
  };

  const { currentUser } = useContext(CurrentUserContext);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleOpenImagePopup(imageComponent) {
    setSelectedImage(imageComponent);
  }

  return (
    <main className="profile">
      <div className="profile__container">
        <div className="profile__cnt">
          <img
            className="profile__image"
            src={currentUser?.avatar}
            alt={currentUser?.name || "Avatar"}
          />
          <button
            className="profile__button"
            id="button__profile"
            onClick={() => handleOpenPopup(editAvatarPopup)}
            aria-label="editAvatar"
            type="button"
          >
            <img
              className="profile__image-edit"
              src={editimg}
              alt="editar perfil"
            />
          </button>
        </div>
        <div className="profile__info">
          <div className="profile__header">
            <p className="profile__name">{currentUser?.name}</p>
            <button
              className="profile__edit"
              onClick={() => handleOpenPopup(editProfilerPopup)}
              aria-label="editUser"
              type="button"
            >
              <img
                className="profile__edit profile__edit_style"
                src={editimg}
                alt="editar_usuario"
              />
            </button>
          </div>
          <p className="profile__role">{currentUser?.about}</p>
        </div>
        <button
          className=""
          id="addButton"
          aria-label="Add card"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        >
          <img
            className="profile__add profile__add_style"
            src={addimg}
            alt="boton_agregar"
          />
        </button>
      </div>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}

      <div className="gallery">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            handleOpenPopup={handleOpenPopup}
            handleOpenImagePopup={handleOpenImagePopup}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            handleClosePopup={onClosePopup}
          />
        ))}
      </div>

      {selectedImage && (
        <ImagePopup
          card={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </main>
  );
}
