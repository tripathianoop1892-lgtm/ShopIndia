import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar-hub">
      <div className="navbar-container-row">
        
        {/* Brand Logo Alignment Frame */}
        <div className="navbar-brand-logo" onClick={() => { navigate("/"); closeMenu(); }}>
          <img src="/omsanjeevani.png" alt="OmSanjeevani Corporate Logo" />
        </div>

        <button className="navbar-menu-toggle" type="button" aria-label="Toggle navigation menu" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)}>
          <span></span><span></span><span></span>
        </button>

        {/* Global Hub Navigation Anchors */}
        <ul className={`navbar-menu-links ${isMenuOpen ? "is-open" : ""}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/features" onClick={closeMenu}>Features</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
        </ul>

        {/* Strategic Gateway Action Switches */}
        <div className={`navbar-action-group ${isMenuOpen ? "is-open" : ""}`}>
          <button className="nav-btn-secondary" onClick={() => { navigate("/login"); closeMenu(); }}>
            Login
          </button>
          <button className="nav-btn-primary" onClick={() => { navigate("/register"); closeMenu(); }}>
            Get Started
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
