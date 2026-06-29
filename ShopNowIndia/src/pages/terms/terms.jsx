import React from "react";
import "./terms.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

<<<<<<< HEAD
// Professional Material UI Icons to align with the rest of the application
import GavelIcon from '@mui/icons-material/Gavel';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PaymentIcon from '@mui/icons-material/Payment';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HistoryIcon from '@mui/icons-material/History';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const Terms = () => {
  return (
    <>
      <Navbar />
      <div className="terms-page-wrapper">

        {/* Hero Section with Ambient Vector Backlighting */}
        <section className="terms-hero-panel">
          <div className="terms-bg-orb terms-orb-emerald"></div>
          <div className="terms-bg-orb terms-orb-indigo"></div>
          
          <div className="terms-hero-inner">
            <span className="terms-badge-pill">Legal Framework</span>
            <h1>Terms & Conditions</h1>
            <p className="terms-hero-lead">
              Please review these Terms & Conditions carefully before interacting with the OmSanjeevani Healthcare Platform.
            </p>
          </div>
        </section>

        {/* Terms Content Card Layout Grid */}
        <section className="terms-main-content">
          <div className="terms-container">

            <div className="terms-card-item">
              <div className="terms-icon-shield blue">
                <GavelIcon className="mui-terms-icon" />
              </div>
              <div className="terms-card-body">
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing, browsing, or utilizing any module across the OmSanjeevani network, you explicitly agree to be bound by these corporate operational terms. If you do not accept these parameters, please discontinue using our digital channels immediately.
                </p>
              </div>
            </div>

            <div className="terms-card-item">
              <div className="terms-icon-shield green">
                <HandshakeIcon className="mui-terms-icon" />
              </div>
              <div className="terms-card-body">
                <h2>2. Platform Services</h2>
                <p>
                  OmSanjeevani acts as a secure multi-tenant healthcare logistics engine connecting wholesale pharmaceutical distributors, verified retail pharmacy shopkeepers, and retail customers for inventory tracking, automated catalog lookups, and direct B2B/B2C order fulfillment workflows.
                </p>
              </div>
            </div>

            <div className="terms-card-item">
              <div className="terms-icon-shield purple">
                <AssignmentIndIcon className="mui-terms-icon" />
              </div>
              <div className="terms-card-body">
                <h2>3. User Responsibilities</h2>
                <p>All active marketplace participants must adhere to the following conditions:</p>
                <ul>
                  <li>✔ Provide completely accurate, valid regulatory registration profile details.</li>
                  <li>✔ Maintain the absolute confidentiality of account corporate passwords.</li>
                  <li>✔ Use workspace dashboards in complete legal accordance with regional pharmaceutical laws.</li>
                  <li>✔ Maintain ethical business practices across all integrated procurement interactions.</li>
                </ul>
              </div>
            </div>

            <div className="terms-card-item">
              <div className="terms-icon-shield gold">
                <PaymentIcon className="mui-terms-icon" />
              </div>
              <div className="terms-card-body">
                <h2>4. Orders & Payments</h2>
                <ul>
                  <li>✔ Dispatched procurement requests are strictly subject to real-time wholesale product availability logs.</li>
                  <li>✔ Listed catalog prices may be calibrated without prior notification boundaries.</li>
                  <li>✔ Financial subtotal line payments must clear successfully before order status confirmation.</li>
                  <li>✔ Individual return and refund rules are established at the discretion of respective selling nodes.</li>
                </ul>
              </div>
            </div>

            <div className="terms-card-item">
              <div className="terms-icon-shield red">
                <ReportProblemIcon className="mui-terms-icon" />
              </div>
              <div className="terms-card-body">
                <h2>5. Prohibited Activities</h2>
                <p>The platform explicitly bars users from the following behaviors:</p>
                <ul>
                  <li>✔ Uploading fraudulent batch details, wrong expiry dates, or false prices.</li>
                  <li>✔ Hacking attempts, database breaches, or intercepting API token headers.</li>
                  <li>✔ Utilizing the platform to circulate illicit or unverified clinical substances.</li>
                  <li>✔ Violating statutory guidelines enforced by medical compliance authorities.</li>
                </ul>
              </div>
            </div>

            <div className="terms-card-item">
              <div className="terms-icon-shield dark-blue">
                <VerifiedUserIcon className="mui-terms-icon" />
              </div>
              <div className="terms-card-body">
                <h2>6. Limitation of Liability</h2>
                <p>
                  OmSanjeevani functions exclusively as an enterprise network facilitator. The platform assumes no systematic liability for third-party medication batch quality variations, sudden carrier delivery delays, or financial balance losses stemming from improper workspace utilization.
                </p>
              </div>
            </div>

            <div className="terms-card-item">
              <div className="terms-icon-shield orange">
                <HistoryIcon className="mui-terms-icon" />
              </div>
              <div className="terms-card-body">
                <h2>7. Changes to Terms</h2>
                <p>
                  We reserve the complete right to update, calibrate, or rewrite parts of these structural Terms & Conditions at any point. Modified policy lines become effective on-the-fly across the ecosystem immediately upon their public synchronization on this view.
                </p>
              </div>
            </div>

            <div className="terms-card-item contact-terms-card">
              <div className="terms-icon-shield emerald">
                <ContactMailIcon className="mui-terms-icon" />
              </div>
              <div className="terms-card-body">
                <h2>8. Legal Contact Information</h2>
                <p>For official support regarding policy interpretations, reach our compliance branch:</p>
                <div className="contact-meta-lines">
                  <p><strong>Corporate Email:</strong> admin@omsanjeevani.com</p>
                  <p><strong>Support Phone:</strong> +91 6204872422</p>
                  <p><strong>Regional Head Office:</strong> Delhi, India</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
      <Footer />
=======
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
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    </>
  );
};

export default Terms;