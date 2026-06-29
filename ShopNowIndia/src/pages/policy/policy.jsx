import React from "react";
import "./policy.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

// Professional Material UI Icons to align with the rest of the application
import ShieldIcon from '@mui/icons-material/Shield';
import SecurityIcon from '@mui/icons-material/Security';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import CookieIcon from '@mui/icons-material/Cookie';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LaunchIcon from '@mui/icons-material/Launch';
import UpdateIcon from '@mui/icons-material/Update';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const Policy = () => {
  return (
    <>
      <Navbar />
      <div className="privacy-page-wrapper">

        {/* Hero Section with Ambient Vector Backlighting */}
        <section className="privacy-hero-panel">
          <div className="privacy-bg-orb privacy-orb-emerald"></div>
          <div className="privacy-bg-orb privacy-orb-indigo"></div>
          
          <div className="privacy-hero-inner">
            <span className="privacy-badge-pill">Data Protection</span>
            <h1>Privacy Policy</h1>
            <p className="privacy-hero-lead">
              Your privacy is critical to us. This Privacy Policy explains how the OmSanjeevani platform collects, uses, and safely protects your personal information.
            </p>
          </div>
        </section>

        {/* Content Section Card Layout Grid */}
        <section className="privacy-main-content">
          <div className="privacy-container">

            <div className="privacy-card-item">
              <div className="privacy-icon-shield blue">
                <VisibilityIcon className="mui-privacy-icon" />
              </div>
              <div className="privacy-card-body">
                <h2>1. Information We Collect</h2>
                <p>We may securely collect the following information strings when you interact with our platform parameters:</p>
                <ul>
                  <li>✔ Full Registration Name or Enterprise Authorized Entity Name</li>
                  <li>✔ Corporate and Personal Communication Email Address</li>
                  <li>✔ Verified Mobile Number for OTP and Dispatch Pipelines</li>
                  <li>✔ Detailed Business Information (e.g., Authorized Pharmacy Shop ID or Wholesale License)</li>
                  <li>✔ Order Details including medicine line count, totals, and transactional history log arrays</li>
                  <li>✔ Device Telemetry (e.g., Browser Type, IP Address, and OS Information)</li>
                </ul>
              </div>
            </div>

            <div className="privacy-card-item">
              <div className="privacy-icon-shield green">
                <SecurityIcon className="mui-privacy-icon" />
              </div>
              <div className="privacy-card-body">
                <h2>2. How We Use Your Information</h2>
                <p>Collected operational variables serve exclusively to refine system mechanics:</p>
                <ul>
                  <li>✔ Create, verify, and monitor multi-tenant administrative workspace nodes.</li>
                  <li>✔ Efficiently compile, route, and fulfill pharmaceutical medicine orders.</li>
                  <li>✔ Deliver direct client support operations and system synchronization logs.</li>
                  <li>✔ Analyze application metrics to improve layout performance and usability.</li>
                  <li>✔ Dispatch real-time notification alerts regarding order state changes and stock drops.</li>
                </ul>
              </div>
            </div>

            <div className="privacy-card-item">
              <div className="privacy-icon-shield purple">
                <ShieldIcon className="mui-privacy-icon" />
              </div>
              <div className="privacy-card-body">
                <h2>3. Data Protection</h2>
                <p>
                  OmSanjeevani employs robust electronic safeguards to insulate data from unauthorized interception. Your active sessions, authorization headers, and personal records are encrypted to maintain safety boundaries across local pharmacy and distributor nodes.
                </p>
              </div>
            </div>

            <div className="privacy-card-item">
              <div className="privacy-icon-shield share-blue">
                <ShareIcon className="mui-privacy-icon" />
              </div>
              <div className="privacy-card-body">
                <h2>4. Sharing of Information</h2>
                <p>Your platform metrics are communicated strictly under necessary operation scenarios:</p>
                <ul>
                  <li>✔ **With Logistics Operators:** Shared with verified distributors and shopkeepers solely to process medicine order rows.</li>
                  <li>✔ **With Service Providers:** Relayed securely to trusted network infrastructure hosts.</li>
                  <li>✔ **Under Statutory Demands:** Shared exclusively when dictated by law enforcement or drug compliance boards.</li>
                </ul>
                <p className="privacy-strict-print">
                  We enforce a strict boundary rule: OmSanjeevani never sells, rents, or leases user registration metrics to third-party marketing brokers.
                </p>
              </div>
            </div>

            <div className="privacy-card-item">
              <div className="privacy-icon-shield gold">
                <CookieIcon className="mui-privacy-icon" />
              </div>
              <div className="privacy-card-body">
                <h2>5. Cookies & Session Storage</h2>
                <p>
                  Our web interface leverages lightweight cookies and local storage tokens to preserve user workspace preferences, maintain active token authorization persistence, and enhance client dashboard scannability. You can calibrate cookie restrictions within browser configuration menus.
                </p>
              </div>
            </div>

            <div className="privacy-card-item">
              <div className="privacy-icon-shield dark-blue">
                <ManageAccountsIcon className="mui-privacy-icon" />
              </div>
              <div className="privacy-card-body">
                <h2>6. User Rights & Data Control</h2>
                <p>As an authorized platform node entity, you hold complete autonomy over your records:</p>
                <ul>
                  <li>✔ Update or recalibrate your account profile parameters at any time.</li>
                  <li>✔ Request fast corrections of mismatched data or incorrect business detail sheets.</li>
                  <li>✔ Initiate permanent account deletion sequences to wipe active cloud history logs.</li>
                  <li>✔ Contact marketplace governance regarding data handling concerns.</li>
                </ul>
              </div>
            </div>

            <div className="privacy-card-item">
              <div className="privacy-icon-shield red">
                <LaunchIcon className="mui-privacy-icon" />
              </div>
              <div className="privacy-card-body">
                <h2>7. Third-Party Links</h2>
                <p>
                  Our platform layout may occasionally feature external redirection endpoints. Please note that OmSanjeevani assumes zero systemic responsibility for the privacy practices, data safety boundaries, or content managed on separate, external domains.
                </p>
              </div>
            </div>

            <div className="privacy-card-item">
              <div className="privacy-icon-shield orange">
                <UpdateIcon className="mui-privacy-icon" />
              </div>
              <div className="privacy-card-body">
                <h2>8. Policy Updates</h2>
                <p>
                  This Privacy Policy may be systematically recalibrated over time to stay current with healthcare safety mandates. Any structural updates will be broadcast directly onto this view with an immediate operational effective date timestamp.
                </p>
              </div>
            </div>

            <div className="privacy-card-item contact-policy-card">
              <div className="privacy-icon-shield emerald">
                <ContactSupportIcon className="mui-privacy-icon" />
              </div>
              <div className="privacy-card-body">
                <h2>9. Data Privacy Contact Branch</h2>
                <p>For official inquiries regarding information tracking controls, coordinate with our support team:</p>
                <div className="policy-contact-lines">
                  <p><strong>Ecosystem Hub:</strong> OmSanjeevani Healthcare</p>
                  <p><strong>Compliance Email:</strong> admin@omsanjeevani.com</p>
                  <p><strong>Support Hotline:</strong> +91 6204872422</p>
                  <p><strong>Central Office Node:</strong> Delhi, India</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Policy;