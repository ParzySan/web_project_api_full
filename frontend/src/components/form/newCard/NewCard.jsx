import { useRef } from "react";

export default function NewCard({ onClose, onAddPlaceSubmit }) {
  const nombreInputRef = useRef();
  const enlaceInputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({
      name: nombreInputRef.current.value,
      link: enlaceInputRef.current.value,
    });
    onClose(); // Cierra el popup después de crear
  }
  return (
    <form
      className="popup__form"
      id="formAdd"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_name"
        id="TituloNew"
        placeholder="Titulo"
        // minlength="2"
        // maxlength="30"
        name="title"
        ref={nombreInputRef}
      />

      <input
        type="url"
        name="link"
        className="popup__input popup__input_role"
        id="LinkNew"
        ref={enlaceInputRef}
        placeholder="Enlace a la imagen"
      />

      <button id="CrearButton" type="submit" className="popup__save-button">
        Crear
      </button>
    </form>
  );
}
