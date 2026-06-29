import React from "react";
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

      </div>
    </nav>
  );
};

export default Navbar;