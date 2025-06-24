import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "../src/components/App.jsx";
import Login from "../src/components/Login.jsx";
import Register from "../src/components/Register.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
