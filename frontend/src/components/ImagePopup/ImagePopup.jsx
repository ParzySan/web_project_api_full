export default function ImagePopup(props) {
  const { card, onClose } = props;
  return (
    <div className="image-modal active" id="popup-size-card">
      <div className="image-modal__content">
        <button className="image-modal__close-button" onClick={onClose}>
          +
        </button>

        <img
          src={card.link}
          alt={card.name}
          className="image-modal__image"
          id="popup-image"
        />
        <h3 className="image-modal__title" id="popup-caption">
          {card.name}
        </h3>
      </div>
    </div>
  );
}
