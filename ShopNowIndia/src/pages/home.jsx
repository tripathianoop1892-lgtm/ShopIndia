import "./home.css";
import { Navigate, useNavigate } from "react-router-dom";
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
      <nav className="navbar">
        <div className="logo">
          <img
  src="/omsanjeevani.png"
  alt="OmSanjeevani"
  className="home-logo"
/>
        </div>

        <ul>
          <li>Home</li>
          <li>Features</li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>

        <div className="nav-btns">
          <button className="outline-btn" onClick={handleLogin}>Login</button>
          <button className="primary-btn">Get Started</button>
        </div>
      </nav>

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
      <footer className="footer">
<section className="logo-section">
        <img
  src="/omsanjeevani.png"
  alt="OmSanjeevani"
  className="footer-logo"
/>

        <p>
          Smart Medicine Distribution Platform for Distributors,
          Shopkeepers and Customers.
        </p>

        <p>
          © 2026 ShopNowIndia. All Rights Reserved.
        </p>
       </section>
       <section className="quick-section">
        <div className="quick-links">
          <h3>Quick Links</h3>
          <p>Home</p>
          <p>Features</p>
          <p>About Us</p>
          <p>Contact us</p>
        
        </div>

       </section>
       <section className="support-section">
        <div className="support">
          <h3>Support</h3>
         <p>Help & FAQ</p>
         <p>Privacy Policy</p>
         <p>Terms & Conditions</p>
        </div>
       </section>
       <section className="contact-section">
        <div className="contact-us">
          <h3>Contact Us</h3>
        </div>

       </section>
      </footer>

    </div>
  );
}

export default Home;