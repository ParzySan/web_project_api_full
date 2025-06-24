import React from "react";
import successIcon from "../images/success.png.png"; // ✅ ícono de éxito
import errorIcon from "../images/error.png.png"; // ❌ ícono de error
import "../blocks/infoTooltip.css"; // CSS personalizado para el modal

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`infoTooltip ${isOpen ? "infoTooltip_opened" : ""}`}>
      <div className="infoTooltip__container">
        <button className="infoTooltip__close-button" onClick={onClose}>
          &times;
        </button>
        <img
          src={isSuccess ? successIcon : errorIcon}
          alt={isSuccess ? "Éxito" : "Error"}
          className="infoTooltip__icon"
        />
        <h2 className="infoTooltip__message">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
