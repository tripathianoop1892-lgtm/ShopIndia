import React from "react";
import "./policy.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

const Policy = () => {
  return (
    <><Navbar/>
    <div className="privacy-page">

      {/* Hero Section */}
      <section className="privacy-hero">
        <h1>Privacy Policy</h1>
        <p>
          Your privacy is important to us. This Privacy Policy explains how
          OmSanjeevani collects, uses, and protects your personal information.
        </p>
      </section>

      {/* Content */}
      <section className="privacy-container">

        <div className="privacy-card">
          <h2>1. Information We Collect</h2>

          <p>We may collect the following information when you use our platform:</p>

          <ul>
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Mobile Number</li>
            <li>Business Information</li>
            <li>Order Details</li>
            <li>Device & Browser Information</li>
          </ul>
        </div>

        <div className="privacy-card">
          <h2>2. How We Use Your Information</h2>

          <ul>
            <li>Create and manage your account.</li>
            <li>Process medicine orders.</li>
            <li>Provide customer support.</li>
            <li>Improve our platform and services.</li>
            <li>Send order updates and notifications.</li>
          </ul>
        </div>

        <div className="privacy-card">
          <h2>3. Data Protection</h2>

          <p>
            We use appropriate security measures to protect your personal
            information from unauthorized access, misuse, or disclosure.
          </p>
        </div>

        <div className="privacy-card">
          <h2>4. Sharing of Information</h2>

          <p>Your information may be shared only when necessary:</p>

          <ul>
            <li>With distributors and shopkeepers for order processing.</li>
            <li>With trusted service providers.</li>
            <li>When required by law or legal authorities.</li>
          </ul>

          <p>
            We never sell or rent your personal information to third parties.
          </p>
        </div>

        <div className="privacy-card">
          <h2>5. Cookies</h2>

          <p>
            Our website may use cookies to enhance user experience, remember
            preferences, and improve website performance.
          </p>
        </div>

        <div className="privacy-card">
          <h2>6. User Rights</h2>

          <ul>
            <li>Update your account information.</li>
            <li>Request correction of incorrect data.</li>
            <li>Request account deletion.</li>
            <li>Contact us regarding privacy concerns.</li>
          </ul>
        </div>

        <div className="privacy-card">
          <h2>7. Third-Party Links</h2>

          <p>
            Our website may contain links to third-party websites. We are not
            responsible for their privacy practices or content.
          </p>
        </div>

        <div className="privacy-card">
          <h2>8. Policy Updates</h2>

          <p>
            This Privacy Policy may be updated from time to time. Changes will
            be posted on this page with the latest effective date.
          </p>
        </div>

        <div className="privacy-card">
          <h2>9. Contact Us</h2>

          <p><strong>OmSanjeevani Healthcare</strong></p>
          <p>Email: admin@omsanjeevani.com</p>
          <p>Phone: +91 6204872422</p>
          <p>Address: Delhi, India</p>
        </div>

      </section>

    </div>
    <Footer/>
    </>
  );
};

export default Policy;