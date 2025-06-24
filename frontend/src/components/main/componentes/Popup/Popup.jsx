export default function Popup(props) {
  //los hijos son el contenido de la ventana emergente

  const { onClose, title, children } = props;
  return (
    <div className="overlay visible">
      <div className="popup visible" id="editButton">
        <button id="EditClose" className="popup__close" onClick={onClose}>
          +
        </button>
        <h2 className="popup__title">{title}</h2>
        {children}
      </div>
    </div>
  );
}
