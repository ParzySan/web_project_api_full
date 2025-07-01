import ImagePopup from "../ImagePopup/ImagePopup";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
export default function Card(props) {
  const { name, link, likes } = props.card;
  const imageComponent = {
    name: name,
    link: link,
  };
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = likes.some(
    (userId) =>
      userId === currentUser._id ||
      (userId._id && userId._id === currentUser._id) // por si likes tiene objetos
  );

  const cardLikeButtonClassName = `gallery__like-button ${
    isLiked ? "activa" : ""
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
