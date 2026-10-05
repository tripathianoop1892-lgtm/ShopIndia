import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import LinkIcon from '@mui/icons-material/Link';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import InventoryIcon from '@mui/icons-material/Inventory';
import GradingIcon from '@mui/icons-material/Grading';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import RecyclingIcon from '@mui/icons-material/Recycling';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';

// Global shared components[cite: 1]
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
import { getHomepageStats } from "../../services/api";

const formatMetric = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number.toLocaleString("en-IN") : "—";
};

function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [statsUnavailable, setStatsUnavailable] = useState(false);

  useEffect(() => {
    let active = true;

    getHomepageStats()
      .then((response) => {
        if (!response?.success) throw new Error(response?.message || "Unable to load statistics.");
        if (active) setStats(response.data);
      })
      .catch(() => {
        if (active) setStatsUnavailable(true);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="home-page-wrapper">
      {/* Global Application Navigation Bar[cite: 1] */}
      <Navbar />

      {/* ==========================================================================
          OMSANJEEVANI OFFICIAL PROFESSIONAL HERO LAYOUT SECTION
          ========================================================================== */}
      <section className="omsanjeevani-hero-viewport">

        {/* Ambient background decoration shapes to mimic image glows */}
        <div className="bg-glow-orb orb-emerald"></div>
        <div className="bg-glow-orb orb-indigo"></div>
        
        {/* Left Column: Brand Metrics & Actions */}
        <div className="hero-branding-column">
          <div className="brand-header-flex">
            <div className="brand-title-text">
              <h2>OmSanjeevani</h2>
              <span className="brand-sub-tag">HEALTHCARE</span>
              <p className="brand-motto-fineprint">CARE • HEAL • REVIVE</p>
            </div>
          </div>

          <h1 className="banner-main-title">
            Distributor <span className="title-hindi-transition">से</span> Shopkeeper, <br />
            Shopkeeper <span className="title-hindi-transition">से</span> Customer <span className="title-hindi-transition">तक</span>
          </h1>

          <p className="banner-sub-lead">
            दवा सप्लाई चेन को डिजिटल बनाने वाला <br />
            <strong>भरोसेमंद प्लेटफ़ॉर्म</strong>
          </p>

          <div className="banner-action-gateway-row">
            <button className="gateway-btn distributor-green" onClick={() => navigate('/register')}>
              <span className="btn-user-icon">👤</span> Register as Distributor
            </button>
            <button className="gateway-btn shopkeeper-blue" onClick={() => navigate('/register')}>
              <span className="btn-user-icon">🏪</span> Register as Shopkeeper
            </button>
            <button className="gateway-btn customer-yellow" onClick={() => navigate('/register')}>
              <span className="btn-user-icon">👤</span> Register as Customer
            </button>
          </div>
        </div>

        {/* Right Column: Floating 3D Device Matrix Graphic Layer */}
        <div className="hero-visualization-column">
          
          {/* Wholesaler Node Box */}
          <div className="floating-node-shield distributor-node">
            <span className="node-pill-label dist">DISTRIBUTOR</span>
            <div className="node-bullet-list">
              <p>📦 Bulk Medicines</p>
              <p>📋 Stock Management</p>
              <p>🛒 Order Processing</p>
              <p>🚛 Fast Dispatch</p>
            </div>
            <span className="node-footer-tag">Distributor</span>
          </div>

          {/* Device Mockup Display */}
          <div className="central-device-container">
            <div className="floating-device-glass-base">
              <div className="device-screen-mockup">
                <div className="mock-app-header">
                  <span>OmSanjeevani</span>
                </div>
                <div className="mock-app-grid">
                  <div className="mock-grid-item"><span>📄</span><p>Place Order</p></div>
                  <div className="mock-grid-item"><span>📋</span><p>My Orders</p></div>
                  <div className="mock-grid-item"><span>📦</span><p>Inventory</p></div>
                  <div className="mock-grid-item"><span>🔔</span><p>Alerts</p></div>
                  <div className="mock-grid-item"><span>🔍</span><p>Search Catalog</p></div>
                  <div className="mock-grid-item"><span>📊</span><p>Reports</p></div>
                </div>
              </div>
            </div>
            <div className="platform-title-overlay">
              <h3>OMSANJEEVANI</h3>
              <h4>PLATFORM</h4>
              <p>स्मार्ट टेक्नोलॉजी, आसान बिज़नेस</p>
            </div>
          </div>

          {/* Customer Node Box */}
          <div className="floating-node-shield customer-node">
            <span className="node-pill-label cust">CUSTOMER</span>
            <div className="node-bullet-list">
              <p>🛡 Pharmacy Listings</p>
              <p>📈 Better Availability</p>
              <p>₹ Affordable Prices</p>
              <p>💜 Health & Care</p>
            </div>
            <span className="node-footer-tag">Customer</span>
          </div>

          {/* Side Overlay Bullet Elements */}
          <div className="floating-context-badge placement-top-right">
            <p>SHOPKEEPER</p>
          </div>
          
          <div className="floating-context-badge placement-center-right">
            <ul>
              <li>🛒 Easy Ordering</li>
              <li>📈 Live Stock Update</li>
              <li>🔔 Expiry Alerts</li>
              <li>⚠️ Low Stock Alerts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Network Telemetry Metrics */}
      <section
        className="telemetry-stats-bar"
        aria-label="Live platform statistics"
        aria-busy={!stats && !statsUnavailable}
      >
        <div className="metric-glass-card">
          <LinkIcon className="metric-card-icon" />
          <div className="metric-meta">
            <h4>{formatMetric(stats?.activeMedicines)}</h4>
            <p>Available Medicine Listings</p>
          </div>
        </div>
        <div className="metric-glass-card">
          <StorefrontIcon className="metric-card-icon" />
          <div className="metric-meta">
            <h4>{formatMetric(stats?.activeDistributors)}</h4>
            <p>Active Distributors</p>
          </div>
        </div>
        <div className="metric-glass-card">
          <PeopleAltTwoToneIcon className="metric-card-icon" />
          <div className="metric-meta">
            <h4>{formatMetric(stats?.activeShopkeepers)}</h4>
            <p>Active Shopkeepers</p>
          </div>
        </div>
        {statsUnavailable && <p className="telemetry-status">Live statistics are temporarily unavailable.</p>}
      </section>

      {/* Core Operational Benefits Section */}
      <section className="informational-home-section">
        <div className="section-meta-header">
          <h2>Why Choose OmSanjeevani</h2>
          <p>Seamless management framework tailored for business growth and safety compliance.</p>
        </div>
        <div className="advantages-structured-grid">
          <div className="advantage-feature-box">
            <RecyclingIcon className="advantage-icon green-icon" />
            <div className="advantage-txt">
              <h4>Reduce Waste</h4>
              <p>Use recorded stock quantities and expiry dates to identify items that need attention.</p>
            </div>
          </div>
          <div className="advantage-feature-box">
            <EventRepeatIcon className="advantage-icon orange-icon" />
            <div className="advantage-txt">
              <h4>Expiry Tracking</h4>
              <p>View date-based warnings before recorded batch expiry dates.</p>
            </div>
          </div>
          <div className="advantage-feature-box">
            <ElectricBoltIcon className="advantage-icon green-icon" />
            <div className="advantage-txt">
              <h4>Faster Ordering</h4>
              <p>Accelerated digital pipelines connecting local storefront requests directly with supplier stocks.</p>
            </div>
          </div>
          <div className="advantage-feature-box">
            <DomainVerificationIcon className="advantage-icon blue-icon" />
            <div className="advantage-txt">
              <h4>Better Inventory Control</h4>
              <p>Keep precise parameters around batch safety metrics, sales counts, and dispatch sheets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Unified Supply Chain Operational Flow */}
      <section className="informational-home-section light-bg-panel">
        <div className="section-meta-header">
          <h2>How It Works</h2>
          <p>A smart, horizontal communication track connecting pharmaceutical sectors.</p>
        </div>
        <div className="workflow-pipeline-flex">
          <div className="pipeline-node-card">
            <img src="./building.png" alt="Warehouse Node" className="node-graphic" />
            <h3>Distributor</h3>
            <p>Adds medicine records and updates wholesale stock quantities.</p>
          </div>
          <div className="pipeline-arrow-connector">→</div>
          <div className="pipeline-node-card">
            <StorefrontIcon className="node-icon blue-node" />
            <h3>Shopkeeper</h3>
            <p>Buys medicine packages directly from wholesale firms via streamlined procurement routes.</p>
          </div>
          <div className="pipeline-arrow-connector">→</div>
          <div className="pipeline-node-card">
            <PeopleAltTwoToneIcon className="node-icon orange-node" />
            <h3>Customer</h3>
            <p>Views the catalogue of the participating pharmacy linked to the customer account.</p>
          </div>
        </div>
      </section>

      {/* Complete Grid Matrix System Features */}
      <section className="informational-home-section">
        <div className="section-meta-header">
          <h2>Main Features</h2>
          <p>Advanced diagnostic data tools driving commercial performance.</p>
        </div>
        <div className="technical-features-grid">
          <div className="feature-matrix-card">
            <InventoryIcon className="matrix-icon green" />
            <h3>Inventory Management</h3>
            <p>Manage batch and quantity records from the account dashboard.</p>
          </div>
          <div className="feature-matrix-card">
            <ReportGmailerrorredIcon className="matrix-icon red" />
            <h3>Expiry Alert Infrastructure</h3>
            <p>Get automated notification triggers before stock breaches disposal margins.</p>
          </div>
          <div className="feature-matrix-card">
            <ProductionQuantityLimitsIcon className="matrix-icon gold" />
            <h3>Low Stock Notifications</h3>
            <p>Receive proactive safety markers when core inventory totals drop below stable points.</p>
          </div>
          <div className="feature-matrix-card">
            <GradingIcon className="matrix-icon blue" />
            <h3>Order Management Engine</h3>
            <p>Route, approve, reject, and monitor procurement pipelines effortlessly.</p>
          </div>
          <div className="feature-matrix-card">
            <SignalCellularAltIcon className="matrix-icon purple" />
            <h3>Earning Dashboards</h3>
            <p>Audit historical sales records, balance sheets, and transactional cash flow lines.</p>
          </div>
          <div className="feature-matrix-card">
            <DescriptionIcon className="matrix-icon red" />
            <h3>Report & Analytics</h3>
            <p>Deep analytical summaries designed to empower smart data decisions.</p>
          </div>
        </div>
      </section>

      {/* Segment Distribution Coverage */}
      <section className="informational-home-section light-bg-panel supply-chain-personas">
        <h2>For Everyone in the Supply Chain</h2>
        <div className="persona-flex-container">
          <div className="persona-card-item">
            <div className="persona-title-row">
              <img src="./building.png" alt="Distributor Entity" />
              <h3>For Distributor</h3>
            </div>
            <ul>
              <li>✔ Add & Maintain Medicines Catalog</li>
              <li>✔ Monitor Supply Lines & Inbound Orders</li>
              <li>✔ Access Sales Analytics & Earnings Data</li>
              <li>✔ Deliver Seamless Wholesale Procurement</li>
            </ul>
          </div>

          <div className="persona-card-item">
            <div className="persona-title-row">
              <StorefrontIcon className="persona-inline-icon blue" />
              <h3>For Shopkeeper</h3>
            </div>
            <ul>
              <li>✔ Source Bulk Stock Easily From Wholesalers</li>
              <li>✔ Modernized Local Inventory Auditing</li>
              <li>✔ Drive Safe Retailing Directly to Consumers</li>
              <li>✔ Access Automated Revenue Metrics Sheet Reports</li>
            </ul>
          </div>

          <div className="persona-card-item">
            <div className="persona-title-row">
              <ReduceCapacityIcon className="persona-inline-icon purple" />
              <h3>For Customers</h3>
            </div>
            <ul>
              <li>✔ Search Local Neighborhood Drug Catalogs</li>
              <li>✔ View Seller-Provided Medicine Availability</li>
              <li>✔ Dispatch Order Requests Fast and Safely</li>
              <li>✔ Secure Vital Prescriptions On Time</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Corporate Summary Card and Developer Profile */}
      <section className="informational-home-section profile-corporate-grid">
        <div className="corporate-founder-card">
         <img src="./omsanjeevani.png" alt="logo" style={{width: "100px", height: "auto"}}/>
         <div  className="founder-meta-details">
          <h2>About OmSanjeevani</h2>
          
          <p>
            OmSanjeevani is a digital health logistics ecosystem connecting 
            participating wholesale vendors, pharmacy owners, and consumer clients under a unified, transparent database framework.
            Our architecture simplifies medical procurement tracking, stabilizes safety bounds around batch expiries, 
            and supports order workflows between participating sellers and customers.
          </p>
           </div>
        </div>
        <div className="corporate-founder-card">
          <div className="founder-avatar-badge">AKT</div>
          <div className="founder-meta-details">
            <h3>Founder & Developer</h3>
            <h2>Anoop Kumar Tripathi</h2>
            <p>
              Anoop Kumar Tripathi engineered the core architecture of OmSanjeevani to modernize 
              pharmaceutical inventory records, clarify order workflows,
              and improve access to operational information for participating users.
            </p>
          </div>
        </div>
      </section>

      {/* Global Interface Footer Block[cite: 1] */}
      <Footer />
    </div>
  );
}

export default Home;
