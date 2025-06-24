import React, { useRef, useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

export default function EditAvatar({ onClose }) {
  const inputRef = useRef();
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleUpdateAvatar({
      avatar: inputRef.current.value,
    });

    onClose(); // Cierra el popup después del submit
  };
  return (
    <form className="popup__form" id="formdelete" onSubmit={handleSubmit}>
      <input
        type="url"
        name="avatar"
        className="popup__input popup__input_profile"
        id="LinkNew"
        ref={inputRef}
        placeholder="Enlace a la imagen"
      />
      <button id="AvatarButton" type="submit" className="popup__save-button">
        Guardar
      </button>
    </form>
  );
}
