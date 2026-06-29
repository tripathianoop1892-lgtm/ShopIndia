import React from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
<<<<<<< HEAD
      <div className="footer-container">

        {/* Brand/Logo Column */}
        <div className="footer-section logo-section">
          <img src="/omsanjeevani.png" alt="OmSanjeevani Logo" className="footer-logo" />
          <p className="brand-tagline">Smart Medicine Distribution Platform</p>
          <p className="brand-subtext">Connecting Distributors, Shopkeepers, and Customers.</p>
        </div>

        {/* Navigation Links Column */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Customer Care Column */}
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><Link to="/contact">Help & FAQ</Link></li>
            <li><Link to="/policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Corporate Address Column */}
        <div className="footer-section contact-info-section">
          <h3>Contact Us</h3>
          <p className="contact-detail"><strong>Mob:</strong> +91 6204872422</p>
          <p className="contact-detail"><strong>Email:</strong> admin@omsanjeevani.com</p>
          <p className="contact-detail">Delhi, India</p>
        </div>

        {/* Marketing Asset Column */}
        <div className="footer-section footer-image-box">
          <img
            src="/medicine.png"
            alt="Pharmaceutical Logistics Illustration"
            className="marketing-pill-img"
=======

      <div className="footer-container">

        {/* Logo Section */}
        <div className="footer-section logo-section">
          <img src="./omsanjeevani.png" alt="" />
          <p>Smart Medicine Distribution</p>
          <p>Platform for Distributors,</p>
          <p>Shopkeepers and Customers.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Features</a></li>
            <li><a href="/">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h3>Support</h3>

          <ul>
            <li><a href="/contact">Help & FAQ</a></li>
            <li><a href="/">Privacy Policy</a></li>
            <li><a href="/">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>

          <p>Mob-6204872422</p>
          <p>admin@omsanjeevani.com</p>
          <p>Delhi India</p>
        </div>

        {/* Right Image */}
        <div className="footer-section footer-image">
          <img
            src="/medicine.png"
            alt="Medicine"
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
          />
        </div>

      </div>

<<<<<<< HEAD
      {/* Copyright Strip */}
      <div className="footer-bottom">
        &copy; 2026 OmSanjeevani Hub. All Rights Reserved.
      </div>
=======
      {/* Copyright */}
      <div className="footer-bottom">
        © 2026 ShopNowIndia. All Rights Reserved.
      </div>

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    </footer>
  );
};

export default Footer;