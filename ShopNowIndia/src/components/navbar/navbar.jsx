import React from "react";
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar-hub">
      <div className="navbar-container-row">
        
        {/* Brand Logo Alignment Frame */}
        <div className="navbar-brand-logo" onClick={() => navigate("/")}>
          <img src="/omsanjeevani.png" alt="OmSanjeevani Corporate Logo" />
        </div>

        {/* Global Hub Navigation Anchors */}
        <ul className="navbar-menu-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Strategic Gateway Action Switches */}
        <div className="navbar-action-group">
          <button className="nav-btn-secondary" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="nav-btn-primary" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>

=======
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
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
      </div>
    </nav>
  );
};

export default Navbar;