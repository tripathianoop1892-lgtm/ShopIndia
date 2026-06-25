import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

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
          />
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        © 2026 ShopNowIndia. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;