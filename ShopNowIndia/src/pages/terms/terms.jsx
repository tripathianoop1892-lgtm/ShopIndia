import React from "react";
import "./terms.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

const Terms = () => {
  return (
    <>
    <Navbar/>
    <div className="terms-page">

      {/* Hero Section */}
      <section className="terms-hero">
        <h1>Terms & Conditions</h1>
        <p>
          Please read these Terms & Conditions carefully before using
          OmSanjeevani Healthcare Platform.
        </p>
      </section>

      {/* Content */}
      <section className="terms-container">

        <div className="terms-card">
          <h2>1. Acceptance of Terms</h2>

          <p>
            By accessing or using OmSanjeevani, you agree to be bound by these
            Terms & Conditions. If you do not agree with any part of these
            terms, please discontinue using the platform.
          </p>
        </div>

        <div className="terms-card">
          <h2>2. Platform Services</h2>

          <p>
            OmSanjeevani is a digital healthcare platform connecting
            Distributors, Shopkeepers, and Customers for medicine ordering,
            inventory management, and healthcare business operations.
          </p>
        </div>

        <div className="terms-card">
          <h2>3. User Responsibilities</h2>

          <ul>
            <li>Provide accurate registration details.</li>
            <li>Keep your account credentials secure.</li>
            <li>Use the platform legally and responsibly.</li>
            <li>Respect other users and business partners.</li>
          </ul>
        </div>

        <div className="terms-card">
          <h2>4. Orders & Payments</h2>

          <ul>
            <li>Orders are subject to product availability.</li>
            <li>Prices may change without prior notice.</li>
            <li>Payments must be completed before order confirmation.</li>
            <li>Refund policies depend on individual sellers.</li>
          </ul>
        </div>

        <div className="terms-card">
          <h2>5. Prohibited Activities</h2>

          <ul>
            <li>Uploading false or misleading information.</li>
            <li>Unauthorized access or hacking attempts.</li>
            <li>Using the platform for illegal activities.</li>
            <li>Violating applicable laws and regulations.</li>
          </ul>
        </div>

        <div className="terms-card">
          <h2>6. Limitation of Liability</h2>

          <p>
            OmSanjeevani is not responsible for third-party product quality,
            delivery delays, or losses arising from misuse of the platform.
          </p>
        </div>

        <div className="terms-card">
          <h2>7. Changes to Terms</h2>

          <p>
            We reserve the right to modify these Terms & Conditions at any time.
            Updated terms will become effective immediately after publication.
          </p>
        </div>

        <div className="terms-card">
          <h2>8. Contact Information</h2>

          <p><strong>Email:</strong> admin@omsanjeevani.com</p>

          <p><strong>Phone:</strong> +91 6204872422</p>

          <p><strong>Address:</strong> Delhi, India</p>
        </div>

      </section>

    </div>
    <Footer/>
    </>
  );
};

export default Terms;