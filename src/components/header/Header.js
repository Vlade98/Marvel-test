import React from "react";
import banner from "../../images/banner.jpg";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <img src={banner} alt="" />
      <h1>Marvel</h1>
    </header>
  );
}

export default Header;
