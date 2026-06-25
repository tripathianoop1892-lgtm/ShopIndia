import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <img src="omsanjeevani.png" alt="" />
      </div>

      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/">Features</a></li>
        <li><a href="/">About Us</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>

      <div className="navbar-buttons">
        <button className="login-btn">Login</button>
        <button className="start-btn">Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;