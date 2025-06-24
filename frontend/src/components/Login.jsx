import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "./header/Header.jsx";
import "../blocks/login.css";
import * as auth from "../utils/auth.js";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password }); // solo pasa los datos a App
  };

  return (
    <div className="login">
      <Header className="header" />

      <Link to="/signin" className="login__button">
        Regístrate
      </Link>

      <form className="login__form" onSubmit={handleSubmit}>
        <p className="login__welcome">Inicia sesión</p>

        <input
          id="email"
          required
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className="inputs"
        />

        <input
          id="password"
          required
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="inputs"
        />
        <div className="login__button-container">
          <button type="submit" className="login__link">
            Inicia sesión
          </button>
        </div>
        <div className="login__signup">
          <p>
            ¿Aún no eres miembro?{" "}
            <Link to="/signin" className="login__link_text">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
