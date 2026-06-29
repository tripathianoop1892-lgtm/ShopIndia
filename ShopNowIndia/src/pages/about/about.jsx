import React from "react";
import "./About.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

// Material UI Icons for uniform branding layout
import GroupsIcon from '@mui/icons-material/Groups';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ShieldIcon from '@mui/icons-material/Shield';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import BarChartIcon from '@mui/icons-material/BarChart';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-page-wrapper">

        {/* Hero Section with Ambient Backlighting */}
        <section className="about-hero-panel">
          <div className="about-bg-orb about-orb-emerald"></div>
          <div className="about-bg-orb about-orb-indigo"></div>
          
          <div className="about-hero-inner">
            <span className="about-badge-pill">Corporate Profile</span>
            <h1>About OmSanjeevani</h1>
            <p className="about-hero-lead">
              India's Smart Medicine Distribution Platform — Connecting healthcare channels through premium digital infrastructure.
            </p>
          </div>
        </section>

        {/* Core Values: Mission & Vision Cards */}
        <section className="about-informational-section">
          <div className="mission-vision-grid">
            <div className="corporate-value-card">
              <GroupsIcon className="value-card-icon" />
              <h3>Who We Are</h3>
              <p>
                OmSanjeevani is a comprehensive digital logistics ecosystem that unifies 
                wholesale distributors, pharmacy shopkeepers, and retail clients into a single secure marketplace framework.
              </p>
            </div>
            <div className="corporate-value-card">
              <AssignmentTurnedInIcon className="value-card-icon green" />
              <h3>Our Mission</h3>
              <p>
                To accelerate medical supply chain delivery paths, introduce transparent auditing parameters, 
                and stabilize critical asset distribution for healthcare operators across India.
              </p>
            </div>
            <div className="corporate-value-card">
              <ShieldIcon className="value-card-icon purple" />
              <h3>Our Vision</h3>
              <p>
                To stand as the nation's most trusted medical supply framework by engineering scalable, 
                high-scannability web applications driven by compliance technology.
              </p>
            </div>
          </div>
        </section>

        {/* Target Segments & Offerings */}
        <section className="about-informational-section light-bg-panel">
          <div className="section-title-block centered">
            <h2>What We Offer</h2>
            <p>Tailored user-space capabilities built specifically to empower every tier of the marketplace matrix.</p>
          </div>
          
          <div className="services-vertical-flex">
            {/* Shopkeepers offering block */}
            <div className="service-segment-row">
              <div className="service-txt-pane">
                <div className="segment-title-icon-row">
                  <StorefrontIcon className="segment-icon blue" />
                  <h3>For Shopkeepers</h3>
                </div>
                <ul>
                  <li>✔ Directly order bulk stock volumes from verified distribution hubs.</li>
                  <li>✔ Modernized local inventory auditing panels with live telemetry updates.</li>
                  <li>✔ Automatic triggers indicating immediate short-stock safety thresholds.</li>
                  <li>✔ Cloud-synced real-time expiration warning badges.</li>
                </ul>
              </div>
            </div>

            {/* Distributors offering block */}
            <div className="service-segment-row reverse">
              <div className="service-txt-pane">
                <div className="segment-title-icon-row">
                  <LocalShippingIcon className="segment-icon green" />
                  <h3>For Distributors</h3>
                </div>
                <ul>
                  <li>✔ Streamline incoming pharmacy B2B purchase requests effortlessly.</li>
                  <li>✔ Comprehensive batch cataloging, tracking variables, and pricing controls.</li>
                  <li>✔ Interactive chronological statement logs tracking sales performance.</li>
                  <li>✔ Automated ledger tools designed to monitor stable wholesale business growth.</li>
                </ul>
              </div>
            </div>

            {/* Customers offering block */}
            <div className="service-segment-row">
              <div className="service-txt-pane">
                <div className="segment-title-icon-row">
                  <GroupsIcon className="segment-icon purple" />
                  <h3>For Customers</h3>
                </div>
                <ul>
                  <li>✔ Instant localized search indexing for neighborhood prescription availability.</li>
                  <li>✔ Transparent pricing guidelines relative to standard maximum retail rules.</li>
                  <li>✔ Direct storefront order routing with zero manual connection gaps.</li>
                  <li>✔ Dependable delivery tracking logs ensuring safety parameters are met.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Grid */}
        <section className="about-informational-section">
          <div className="section-title-block">
            <h2>Why Choose Us</h2>
            <p>Architectural highlights ensuring seamless clinical coordination.</p>
          </div>
          <div className="why-choose-features-grid">
            <div className="feature-pill-box"><span>📊</span> Real-Time Inventory Tracking</div>
            <div className="feature-pill-box"><span>⚠️</span> Automated Expiry Warnings</div>
            <div className="feature-pill-box"><span>📋</span> Comprehensive Order Controls</div>
            <div className="feature-pill-box"><span>🏢</span> Specialized Distributor Views</div>
            <div className="feature-pill-box"><span>🏪</span> Scoped Shopkeeper Workspaces</div>
            <div className="feature-pill-box"><span>🔒</span> Encrypted Multi-Tenant Safety</div>
            <div className="feature-pill-box"><span>⚡</span> High-Scannability Layouts</div>
            <div className="feature-pill-box"><span>🛠</span> 24/7 Dedicated Support Lines</div>
          </div>
        </section>

        {/* Network Metrics Stats */}
        <section className="about-informational-section light-bg-panel network-stats-bar">
          <div className="network-stat-card">
            <BarChartIcon className="stat-card-icon-mui" />
            <h2>1,000+</h2>
            <p>Active Medicines Indexed</p>
          </div>
          <div className="network-stat-card">
            <StorefrontIcon className="stat-card-icon-mui blue" />
            <h2>500+</h2>
            <p>Retail Pharmacies Integrated</p>
          </div>
          <div className="network-stat-card">
            <LocalShippingIcon className="stat-card-icon-mui green" />
            <h2>100+</h2>
            <p>Wholesale Firms Verified</p>
          </div>
          <div className="network-stat-card">
            <HelpCenterIcon className="stat-card-icon-mui purple" />
            <h2>24/7</h2>
            <p>Live Monitoring Architecture</p>
          </div>
        </section>

        {/* CTA Callout Banner Panel */}
        <section className="about-cta-banner">
          <h2>Join OmSanjeevani Today</h2>
          <p>Transform your operational supply channels with our smart, cloud-persisted healthcare network.</p>
          <button className="cta-action-btn">Get Started Now</button>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default About;