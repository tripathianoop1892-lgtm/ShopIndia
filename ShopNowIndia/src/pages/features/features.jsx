import React from "react";
import "./features.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

// Material UI icons to match the design language of your home screen
import InventoryIcon from '@mui/icons-material/Inventory';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';

const Features = () => {
  return (
    <>
      <Navbar />
      <div className="features-page-wrapper">
        
        {/* Modernized Hero Banner Layer with Ambient Backlighting */}
        <div className="features-hero-panel">
          <div className="features-bg-orb features-orb-emerald"></div>
          <div className="features-bg-orb features-orb-indigo"></div>
          
          <div className="features-hero-content">
            <div>
            <span className="features-badge-pill">Enterprise Capabilities</span>
            <h1>
              Our Core <span className="gradient-brand-text">Platform Features</span>
            </h1>
            <p className="features-hero-lead">
              A secure, high-scannability digital ecosystem for healthcare distributors, 
              local pharmacy owners, and consumer clients across India.
            </p>
            </div>
            <img src="feature.png" alt="" />
          </div>
        </div>

        {/* Structured Feature Matrix Grid */}
        <div className="features-grid-section">
          <div className="features-container">

            <div className="feature-matrix-card">
              <div className="feature-icon-wrapper green">
                <InventoryIcon className="matrix-icon" />
              </div>
              <h3>Inventory Management</h3>
              <p>
                Track clinical batches and manage multi-tier product stock easily in real-time.
              </p>
            </div>

            <div className="feature-matrix-card">
              <div className="feature-icon-wrapper red">
                <ReportGmailerrorredIcon className="matrix-icon" />
              </div>
              <h3>Expiry Alert Framework</h3>
              <p>
                Receive proactive automated cloud notifications for medicines nearing their expiry boundaries.
              </p>
            </div>

            <div className="feature-matrix-card">
              <div className="feature-icon-wrapper purple">
                <SignalCellularAltIcon className="matrix-icon" />
              </div>
              <h3>Distributor Dashboards</h3>
              <p>
                Seamlessly control large batch wholesale catalogs, track outbound distribution lines, and audit financial records.
              </p>
            </div>

            <div className="feature-matrix-card">
              <div className="feature-icon-wrapper blue">
                <StorefrontIcon className="matrix-icon" />
              </div>
              <h3>Shopkeeper Workspace</h3>
              <p>
                Query wholesale distributor ledgers directly, place orders, and monitor retail counter shelves instantly.
              </p>
            </div>

            <div className="feature-matrix-card">
              <div className="feature-icon-wrapper gold">
                <ElectricBoltIcon className="matrix-icon" />
              </div>
              <h3>Fast Ordering Pipelines</h3>
              <p>
                Accelerated checkout tunnels designed to process critical B2B and retail order flows hassle-free.
              </p>
            </div>

            <div className="feature-matrix-card">
              <div className="feature-icon-wrapper emerald">
                <DomainVerificationIcon className="matrix-icon" />
              </div>
              <h3>Secure Data Safeguards</h3>
              <p>
                Encrypted multi-tenant login structures protecting operational transactions, business directories, and health logs.
              </p>
            </div>

          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Features;