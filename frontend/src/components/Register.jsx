import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/auth.js";
import "../blocks/register.css";
import Header from "./header/Header.jsx";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null); // true / false para InfoTooltip
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("El correo no es válido.");
      return;
    }
    onRegister({ email, password });
  };
  return (
    <div className="register">
      <Header className="header" />

      <Link to="/signup" className="register__button">
        Inicia sesión
      </Link>

      <form className="register__form" onSubmit={handleSubmit}>
        <p className="register__welcome">Registrate</p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <div className="register__button-container">
          <button type="submit" className="register__link">
            Registrate
          </button>
        </div>
        <div className="register__signup">
          <p>
            ¿Ya eres miembro?{" "}
            <Link to="/signup" className="register__link_text">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
