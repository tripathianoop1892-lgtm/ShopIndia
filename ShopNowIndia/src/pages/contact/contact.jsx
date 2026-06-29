import React from "react";
import "./Contact.css";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";

// Professional Material UI Icons matching corporate layouts
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="contact-page-wrapper">

        {/* Hero Header Section with Vector Lighting Glows */}
        <section className="contact-hero-panel">
          <div className="contact-bg-orb contact-orb-emerald"></div>
          <div className="contact-bg-orb contact-orb-indigo"></div>
          
          <div className="contact-hero-inner">
            <span className="contact-badge-pill">Support Center</span>
            <h1>Contact Us</h1>
            <p className="contact-hero-lead">
              Connect with OmSanjeevani Healthcare and take your medicine business digital. Our teams are available to stabilize your distribution pipelines.
            </p>
          </div>
        </section>

        {/* Core Layout Split Section */}
        <div className="contact-main-grid-container">
          <div className="contact-split-layout">

            {/* Left Side: Structured Contact Cards Information */}
            <div className="contact-info-cards-column">
              <h2>Get In Touch</h2>
              <p className="column-subtitle">Reach out through our authorized communication metrics channels.</p>

              <div className="info-glass-card">
                <div className="info-icon-wrapper blue">
                  <LocationOnIcon className="mui-contact-icon" />
                </div>
                <div className="info-txt-meta">
                  <h3>Official Corporate Address</h3>
                  <p>Delhi, India</p>
                </div>
              </div>

              <div className="info-glass-card">
                <div className="info-icon-wrapper green">
                  <PhoneIcon className="mui-contact-icon" />
                </div>
                <div className="info-txt-meta">
                  <h3>Direct Support Line</h3>
                  <p>+91 6204872422</p>
                </div>
              </div>

              <div className="info-glass-card">
                <div className="info-icon-wrapper purple">
                  <EmailIcon className="mui-contact-icon" />
                </div>
                <div className="info-txt-meta">
                  <h3>Corporate Contact Email</h3>
                  <p>support@omsanjeevani.com</p>
                </div>
              </div>

              <div className="info-glass-card">
                <div className="info-icon-wrapper gold">
                  <AccessTimeIcon className="mui-contact-icon" />
                </div>
                <div className="info-txt-meta">
                  <h3>Active Working Hours</h3>
                  <p>Monday - Saturday</p>
                  <p className="fine-time">09:00 AM - 06:00 PM (IST)</p>
                </div>
              </div>
            </div>

            {/* Right Side: Secure Communication Form Sheet */}
            <div className="contact-secure-form-column">
              <h2>Send Message</h2>
              <p className="column-subtitle">Submit your query straight to our marketplace compliance administrators.</p>
              
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-input-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter Your Name" required />
                </div>

                <div className="form-input-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="Enter Your Email" required />
                </div>

                <div className="form-input-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="Enter Your Phone Number" />
                </div>

                <div className="form-input-group">
                  <label>Message Content</label>
                  <textarea rows="5" placeholder="Write Your Message Here..." required></textarea>
                </div>

                <button type="submit" className="form-submit-dispatch-btn">
                  <SendIcon className="submit-btn-icon" /> Send Message
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Dynamic FAQ Details Toggles Section */}
        <section className="faq-interactive-section">
          <div className="faq-section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Common quick-reference answers regarding the OmSanjeevani Healthcare infrastructure.</p>
          </div>
          
          <div className="faq-toggles-wrapper">
            <details>
              <summary>What is OmSanjeevani?</summary>
              <p>
                OmSanjeevani is a smart medicine distribution platform that connects wholesale Distributors, pharmacy Shopkeepers, and retail Customers on a unified digital ecosystem.
              </p>
            </details>

            <details>
              <summary>Can a Shopkeeper order directly from a Distributor?</summary>
              <p>
                Yes, verified Shopkeepers can review live distributor inventory catalogs and place bulk B2B orders directly through their workspace panel.
              </p>
            </details>

            <details>
              <summary>Is Inventory Management available?</summary>
              <p>
                Yes, our system architecture contains real-time Inventory Tracking, automated Short-Stock safeguards, and predictive Expiry Alert notifications.
              </p>
            </details>

            <details>
              <summary>Can customers search for medicines?</summary>
              <p>
                Yes, retail consumers can look up neighborhood drug store catalogs to verify medicine availability and prices instantly.
              </p>
            </details>

            <details>
              <summary>Who can use OmSanjeevani?</summary>
              <p>
                Authorized medical distribution agencies, licensed retail pharmacy shopkeepers, medical store owners, and retail clients can leverage our secure modules.
              </p>
            </details>

            <details>
              <summary>Will OmSanjeevani be available across India?</summary>
              <p>
                Our core developmental goal is to build a unified, digital, transparent, and highly efficient medicine supply distribution network across all states in India.
              </p>
            </details>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default Contact;