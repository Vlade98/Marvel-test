import React from "react";

import banner from "../../images/banner.jpg";
import classes from "./Header.module.css";

function Header() {
  return (
    <header className={classes.header}>
      <img src={banner} alt="" />
      <h1>Marvel</h1>
    </header>
  );
}

export default Header;
