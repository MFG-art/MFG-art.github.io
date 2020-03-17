import React from "react";
import { Link } from "react-router-dom";

function NavTabs() {
  return (
    <ul className="nav nav-tabs" style={{ backgroundColor: "white" }}>
      <li className="nav-item">
        <Link
          to="/"
          className={
            window.location.pathname === "/" ? "nav-link active" : "nav-link"
          }
        >
          About
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/contact"
          className={
            window.location.pathname === "/contact"
              ? "nav-link active"
              : "nav-link"
          }
        >
          Contact
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/portfolio"
          className={
            window.location.pathname === "/portfolio"
              ? "nav-link active"
              : "nav-link"
          }
        >
          Portfolio
        </Link>
      </li>
      <h1 id="title-name">Mauricio Fuentes Gomez</h1>
    </ul>
  );
}

export default NavTabs;
