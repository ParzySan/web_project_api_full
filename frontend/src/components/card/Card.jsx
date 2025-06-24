import ImagePopup from "../ImagePopup/ImagePopup";
import React from "react";
export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const imageComponent = {
    name: name,
    link: link,
  };
  // const { currentUser } = useContext(CurrentUserContext);
  // function handleOpenImagePopup(imageComponent) {
  //   setSelectedImage(imageComponent);
  // }
  const cardLikeButtonClassName = `gallery__like-button ${
    isLiked ? "activa " : ""
  }`;

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="gallery__card">
      <button
        className="gallery__remove-button"
        onClick={handleDeleteClick}
      ></button>
      <img
        className="gallery__image"
        src={link}
        alt={name}
        onClick={() => props.handleOpenImagePopup(imageComponent)}
      />
      <div className="gallery__card-info">
        <h3 className="gallery__title">{name}</h3>
        <button
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
      </div>
    </article>
  );
}
