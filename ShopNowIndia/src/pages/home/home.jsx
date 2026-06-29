<<<<<<< HEAD
import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
=======
import "./home.css";
import { Navigate, useNavigate } from "react-router-dom";
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
import LinkIcon from '@mui/icons-material/Link';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import InventoryIcon from '@mui/icons-material/Inventory';
import GradingIcon from '@mui/icons-material/Grading';
<<<<<<< HEAD
=======

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import RecyclingIcon from '@mui/icons-material/Recycling';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
<<<<<<< HEAD

// Global shared components[cite: 1]
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";

function Home() {
  const navigate = useNavigate();

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
              <p>🛡 Genuine Medicines</p>
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
      <section className="telemetry-stats-bar">
        <div className="metric-glass-card">
          <LinkIcon className="metric-card-icon" />
          <div className="metric-meta">
            <h4>1,542+</h4>
            <p>Total Active Medicines</p>
          </div>
        </div>
        <div className="metric-glass-card">
          <StorefrontIcon className="metric-card-icon" />
          <div className="metric-meta">
            <h4>320+</h4>
            <p>Verified Distributors</p>
          </div>
        </div>
        <div className="metric-glass-card">
          <PeopleAltTwoToneIcon className="metric-card-icon" />
          <div className="metric-meta">
            <h4>1,250+</h4>
            <p>Registered Shopkeepers</p>
          </div>
        </div>
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
              <p>Minimize medicine waste throughout the logistics lifecycle with predictive stock tracking.</p>
            </div>
          </div>
          <div className="advantage-feature-box">
            <EventRepeatIcon className="advantage-icon orange-icon" />
            <div className="advantage-txt">
              <h4>Expiry Tracking</h4>
              <p>Receive live inventory warnings before batch expiration windows degrade.</p>
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
            <p>Adds medicine records and updates real-time wholesale supply stock balances.</p>
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
            <p>Locates nearby pharmacies to purchase required stock lines with confidence.</p>
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
            <p>Manage and track all medical batches across digital network channels in real-time.</p>
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
              <li>✔ Instantly Verify Medicine Availability</li>
              <li>✔ Dispatch Order Requests Fast and Safely</li>
              <li>✔ Secure Vital Prescriptions On Time</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Corporate Summary Card and Developer Profile */}
      <section className="informational-home-section profile-corporate-grid">
        <div className="about-branding-card">
          <h2>About OmSanjeevani</h2>
          <p>
            OmSanjeevani is a digital health logistics ecosystem connecting 
            authorized wholesale vendors, pharmacy owners, and consumer clients under a unified, transparent database framework. 
            Our architecture simplifies medical procurement tracking, stabilizes safety bounds around batch expiries, 
            and streamlines retail supply operations across India.
          </p>
        </div>
        <div className="corporate-founder-card">
          <div className="founder-avatar-badge">AKT</div>
          <div className="founder-meta-details">
            <h3>Founder & Developer</h3>
            <h2>Anoop Kumar Tripathi</h2>
            <p>
              Anoop Kumar Tripathi engineered the core architecture of OmSanjeevani to modernize 
              pharmaceutical inventory networks, make distribution pipelines completely transparent, 
              and introduce high efficiency to regional healthcare marketplaces.
            </p>
          </div>
        </div>
      </section>

      {/* Global Interface Footer Block[cite: 1] */}
      <Footer />
=======
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
// Image use karni ho to uncomment kar lena
// import heroImg from "../assets/dashboard.png";
// import founderImg from "../assets/founder.jpg";

function Home() {

  const nav = useNavigate();

  const handleLogin = () => {
    nav('/login');
  }
  return (
    <div className="home">

      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-left">
          <h1>
            Smart Medicine
            <br />
            <span>Distribution Platform</span>
          </h1>

          <p>
            Manage Inventory, Expiry Alerts, Low Stock Monitoring
            and Medicine Orders in One Powerful Platform.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Get Started</button>
            <button className="outline-btn" onClick={handleLogin}>Login</button>
            
          </div>
        </div>

        <div className="hero-right">

          {/* Image lagani ho to uncomment karna */}

          {/*
          <img src={heroImg} alt="Dashboard" />
          */}

          <div className="demo-card">
            <h2>Dashboard Preview</h2>
            <p>Total Medicines : 1542</p>
            <p>Expiring Soon : 32</p>
            <p>Low Stock : 18</p>
            <p>Monthly Revenue : ₹4,85,000</p>
          </div>

        </div>

      </section>

      {/* Stats */}
      <section className="stats">
        <div className="card">
          <LinkIcon fontSize="large" className="card-icon"/>
          <div className="card-content">
            <h4>1,542+</h4>
            <p>Total Medicines</p>
          </div>
        </div>
        <div className="card">320+ Distributors</div>
        <div className="card">1250+ Shopkeepers</div>
      </section>
      {/* Why Choose OmSanjeevni */}
      <section className="home-section">
        <h2>Why Choose OmSanjeevni</h2>
        <div className="home-section-main">
          <div className="workflow">
         <div className="why-box">
         <RecyclingIcon fontSize="large" style={{color: "#07542a"}}/>
         <div className="box-content">
          <p>Reduce</p>
          <p>Medicine Waste</p>
         </div>
         </div>
        </div>
         <div className="workflow">
         <div className="why-box">
         <EventRepeatIcon fontSize="large" style={{color: "orange"}}/>
         <div className="box-content">
          <p>Expiry</p>
          <p>Tracking</p>
         </div>
         </div>
        </div>
        <div className="workflow">
         <div className="why-box">
         <ElectricBoltIcon fontSize="large" style={{color: "#07542a"}}/>
         <div className="box-content">
          <p>Faster</p>
          <p>Ordering</p>
         </div>
         </div>
        </div>
        <div className="workflow">
         <div className="why-box">
         <DomainVerificationIcon fontSize="large" style={{color: "#07542a"}}/>
         <div className="box-content">
          <p>Better Inventory</p>
          <p>Control</p>
         </div>
         </div>
        </div>
        <div className="workflow">
         <div className="why-box">
         <img src="monitoring.png" alt="" style={{width: "40px"}} />
         <div className="box-content">
          <p>Sales</p>
          <p>Monitoring</p>
         </div>
         </div>
        </div>
        </div>
        
      </section>
      {/* Workflow */}
      <section className="home-section">

        <h2>How It Works</h2>

        <div className="workflow">
          <div className="box">
            <img src="./building.png" />
            <div className="box-content">
              <h3>Distributor</h3>
              <p>Adds Medicine</p>
              <p>and manages stock</p>
            </div>
          </div>
          <span>→</span>
          <div className="box">
            <StorefrontIcon fontSize="large" style={{color: "#072654"}}/>
            <div className="box-content">
              <h3>Shopkeeper</h3>
              <p>Buys medicine</p>
              <p>from distributor</p>
            </div>
          </div>
          <span>→</span>
          <div className="box">
            <PeopleAltTwoToneIcon fontSize="large" style={{color:"orange"}}/>
            <div className="box-content">
              <h3>Customer</h3>
              <p>Buys medicine</p>
              <p>from Shopkeeper</p>
            </div>
            </div>
        </div>

      </section>

      {/* Features */}
      <section className="home-section">

        <h2>Main Features</h2>

        <div className="grid">
          <div className="feature-card"><InventoryIcon  fontSize="large" style={{color:"green"}}/>
          <div className="main">
            <h3>Inventory</h3>
            <h3>Management</h3>
            <p>manage and track all</p>
            <p>medicines in real-time</p>
          </div>

        
          </div>
          <div className="feature-card"><ReportGmailerrorredIcon fontSize="large" style={{color:"red"}}/>
            <div className="main">
             <h3>Expiry Alert</h3>
             <p>Get alerts before </p>
             <p>medicine Expiry</p>
            </div>
          </div>
          <div className="feature-card"><ProductionQuantityLimitsIcon fontSize="large" style={{color:"#ebb134"}}/>
          <div className="main">
            <h3>Low Stock Alert</h3>
            <p>Receive notification</p>
            <p>for low stock</p>

          </div>

          </div>
          <div className="feature-card"><GradingIcon fontSize="large" style={{color:"blue"}}/>
           <div className="main">
            <h3>Order</h3>
            <h3>Management</h3>
            <p>manage all orders</p>
            <p>easily</p>

           </div>
          </div>
          <div className="feature-card"><SignalCellularAltIcon fontSize="large" style={{color:"purple"}}/>
          <div className="main">
            <h3>Earning</h3>
            <h3>Dashboard</h3>
            <p>Track sales, profit</p>
            <p>and earning</p>
          </div>
          </div>
          <div className="feature-card"><DescriptionIcon fontSize="large" style={{color:"red"}}/>
          <div className="main">
          <h3>Report & Analytics</h3>
          <p>Detailed reports for </p>
          <p>better decisions</p>
           </div>
          </div>
        </div>

      </section>
      <section className="supply">
        <h2>For Everyone in the Supply Chain</h2>
        <div className="supply-section">
          <div className="supply-box"> 
          <div className="supply-heading">
            <img src="./building.png" />
            <h3>for Distributor</h3>
          </div>
          <div className="supply-content">
            <div className="supply-content-p">
              <p>&#x2714; Add & Medicines</p>
              <p>&#x2714; Track Stock & Orders</p>
              <p>&#x2714; Monitor Sales & Earning</p>
              <p>&#x2714; Supply to Shopkeeper</p>
            </div>
            <img src="./supply.png" alt="" />
          </div>
        </div>
        <div className="supply-box"> 
          <div className="supply-heading">
            <StorefrontIcon fontSize="large" style={{color: "blue", marginLeft: '15px', marginRight: "10px"}}/>
            <h3>for ShopKeeper</h3>
          </div>
          <div className="supply-content">
            <div className="supply-content-p">
              <p>&#x2714; Order Medicines Easilly</p>
              <p>&#x2714; Track Inventory</p>
              <p>&#x2714; Sell to Customers</p>
              <p>&#x2714; View Profit & Report</p>
            </div>
            <img src="./shopkeeper.png" alt="" />
          </div>
        </div>
        <div className="supply-box"> 
          <div className="supply-heading">
        <ReduceCapacityIcon fontSize="large" style={{color: "blue", marginLeft: '15px', marginRight: "10px"}}/>
            <h3>for Customers</h3>
          </div>
          <div className="supply-content">
            <div className="supply-content-p">
              <p>&#x2714; Serach Medicines</p>
              <p>&#x2714; Place Order Easily</p>
              <p>&#x2714; Order Tracking</p>
              <p>&#x2714; Get Medicine on Time</p>
            </div>
            <img src="./customer.png" alt="" />
          </div>
        </div>
        </div>
      </section>

      {/* About + Founder */}
      <section className="about-section">

        <div className="about-card">

          <h2>About ShopNowIndia</h2>

          <p>
            ShopNowIndia is a digital medicine distribution platform
            connecting distributors, shopkeepers and customers through
            a secure and smart ecosystem. Our mission is to simplify
            medicine inventory management, expiry tracking, low stock
            monitoring and supply chain operations.
          </p>

        </div>

        <div className="founder-card">

          {/* Founder image lagani ho to uncomment karna */}

          {/*
          <img src={founderImg} alt="Founder" />
          */}

          <div className="founder-avatar">
            AKT
          </div>

          <div>

            <h3>Founder & Developer</h3>
            <h2>Anoop Kumar Tripathi</h2>

            <p>
              ShopNowIndia ke founder aur developer Anoop Kumar
              Tripathi hain. Unhone medicine inventory management,
              expiry tracking aur supply chain operations ko
              simplify karne ke liye is platform ko develop kiya.
              Is platform ka uddeshya medicine distribution ko
              digital, transparent aur efficient banana hai.
            </p>

          </div>

        </div>

      </section>

      {/* Footer */}
      <Footer/>

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    </div>
  );
}

export default Home;