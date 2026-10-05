import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { businessDetails } from "../../config/businessDetails";

const Footer = () => {
  return (
    <footer className="footer">
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
            <li><Link to="/catalog">Public Catalogue</Link></li>
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
            <li><Link to="/refunds">Cancellation & Refunds</Link></li>
            <li><Link to="/shipping">Shipping & Delivery</Link></li>
          </ul>
        </div>

        {/* Corporate Address Column */}
        <div className="footer-section contact-info-section">
          <h3>Contact Us</h3>
          <p className="contact-detail"><strong>{businessDetails.brandName}</strong></p>
          <p className="contact-detail">Operated by {businessDetails.ownerName}</p>
          <p className="contact-detail"><strong>Mob:</strong> {businessDetails.supportPhone}</p>
          <p className="contact-detail"><strong>Email:</strong> {businessDetails.supportEmail}</p>
          <p className="contact-detail">{businessDetails.businessAddress}</p>
        </div>

        {/* Marketing Asset Column */}
        <div className="footer-section footer-image-box">
          <img
            src="/medicine.png"
            alt="Pharmaceutical Logistics Illustration"
            className="marketing-pill-img"
          />
        </div>

      </div>

      {/* Copyright Strip */}
      <div className="footer-bottom">
        &copy; 2026 {businessDetails.brandName}. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
