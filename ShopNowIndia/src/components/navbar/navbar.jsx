import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("public-navigation-open");
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("public-navigation-open");
    };
  }, [isMenuOpen]);

  return (
    <nav className="navbar-hub">
      <div className="navbar-container-row">
        
        {/* Brand Logo Alignment Frame */}
        <div className="navbar-brand-logo" onClick={() => { navigate("/"); closeMenu(); }}>
          <img src="/omsanjeevani.png" alt="OmSanjeevani Corporate Logo" />
        </div>

        <button className={`navbar-menu-toggle ${isMenuOpen ? "is-open" : ""}`} type="button" aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isMenuOpen} aria-controls="public-navigation-menu" onClick={() => setIsMenuOpen((open) => !open)}>
          <span></span><span></span><span></span>
        </button>

        <div id="public-navigation-menu" className={`navbar-mobile-panel ${isMenuOpen ? "is-open" : ""}`}>
          {/* Global Hub Navigation Anchors */}
          <ul className="navbar-menu-links">
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/features" onClick={closeMenu}>Features</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
          </ul>

          {/* Strategic Gateway Action Switches */}
          <div className="navbar-action-group">
            <button className="nav-btn-secondary" onClick={() => { navigate("/login"); closeMenu(); }}>
              Login
            </button>
            <button className="nav-btn-primary" onClick={() => { navigate("/register"); closeMenu(); }}>
              Get Started
            </button>
          </div>
        </div>

      </div>
      {isMenuOpen && <button type="button" className="navbar-menu-backdrop" onClick={closeMenu} aria-label="Close navigation menu" />}
    </nav>
  );
};

export default Navbar;
