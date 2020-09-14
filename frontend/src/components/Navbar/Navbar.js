import React from "react";

import { welcomeHeader } from "./Navbar.module.scss";

const Navbar = ({ navHeight }) => {
  return (
    <div className={welcomeHeader} style={{ height: navHeight }}>
      <h1>5%</h1>
      <div>
        <a href="/profile" style={{ fontSize: "25px", marginRight: "35px" }}>
          <i className="fas fa-user-circle"></i>
        </a>
        <a href="/login" style={{ fontSize: "25px" }}>
          <i className="fas fa-sign-out-alt"></i>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
