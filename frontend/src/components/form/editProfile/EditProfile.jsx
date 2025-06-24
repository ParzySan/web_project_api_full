import { useState, useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

export default function EditProfile({ onClose }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext); // Obtiene el objeto currentUser

  const [name, setName] = useState(currentUser.name); // Agrega la variable de estado para name
  const [description, setDescription] = useState(currentUser.about); // Agrega la variable de estado para description

  const handleNameChange = (event) => {
    setName(event.target.value); // Actualiza name cuando cambie la entrada
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Actualiza description cuando cambie la entrada
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del envío de formularios

    handleUpdateUser({ name, about: description });
    onClose();
    // handleClosePopup(); // Actualiza la información del usuario
  };

  return (
    <form className="popup__form" id="formEdit" onSubmit={handleSubmit}>
      <input
        type="text"
        className="popup__input popup__input_name"
        placeholder="Nombre"
        id="InputName"
        maxLength="40"
        minLength="2"
        name="name"
        value={name} // Vincula name con la entrada
        onChange={handleNameChange}
      />

      <input
        type="text"
        className="popup__input popup__input_role"
        placeholder="Acerca de mi"
        id="InputRole"
        name="job"
        maxLength="200"
        minLength="2"
        value={description} // Vincula description con la entrada
        onChange={handleDescriptionChange}
      />

      <button id="EditButton" type="submit" className="popup__save-button">
        Guardar
      </button>
    </form>
  );
}
