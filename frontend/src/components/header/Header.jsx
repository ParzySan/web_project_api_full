import React, { useState } from "react";

import logo from "../../images/Vector.png";
import line from "../../images/Line.png";

function Header() {
  return (
    <header className="header">
      <div className="header__top">
        <img
          className="header__logo header__logo_style"
          src={logo}
          alt="Logo inicio"
        />
      </div>
      <div>
        <img className="header__line" src={line} alt="linea punteada" />
      </div>
    </header>
  );
}
export default Header;
