import React from "react";
import "./About.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import GroupsIcon from '@mui/icons-material/Groups';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
const About = () => {
  return (
    <>
    <Navbar/>
    <div className="about">

      {/* Hero Section */}
      <section className="about-hero">
        <div className="">
        <h1>About OmSanjeevani</h1>
        <p>
          India's Smart Medicine Distribution Platform
        </p>
        </div>
        <img src="about.png" alt="" style={{width:"600px"}}/>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="card">
          <GroupsIcon fontSize="large"/>
          <div className="">
          <h5>Who We Are</h5>
          <p>
            OmSanjeevani is a healthcare distribution platform that connects
            Distributors, Shopkeepers, and Customers on a single digital
            ecosystem. Our mission is to simplify medicine distribution,
            inventory management, and order processing across India.
          </p>
          </div>
        </div>
        <div className="card">
          <GroupsIcon fontSize="large"/>
          <div className="">
          <h5>Our Mission</h5>
          <p>
            To make medicine distribution faster, transparent, and accessible
            for every shopkeeper and customer.
          </p>
          </div>
        </div>

        <div className="card">
          <GroupsIcon fontSize="large"/>
          <div className="">
          <h5>Our Vision</h5>
          <p>
            To become India's most trusted healthcare distribution platform
            through innovation and technology.
          </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <h2>What We Offer</h2>

        <div className="service-cards">

          <div className="service-card">
            <div>
            <h3>🏪 For Shopkeepers</h3>
            <ul>
              <li>Medicine Ordering</li>
              <li>Inventory Management</li>
              <li>Low Stock Alerts</li>
              <li>Expiry Tracking</li>
            </ul>
            </div>
            <img src="forShopkeeper.png" alt=""  style={{width:"200px", height: "auto"}}/>
          </div>

          <div className="service-card">
            <div>
            <h3>🚚 For Distributors</h3>
            <ul>
              <li>Order Management</li>
              <li>Sales Tracking</li>
              <li>Inventory Control</li>
              <li>Business Growth</li>
            </ul>
            </div>
            <img src="forDistributor.png" alt="" style={{width:"200px", height: "auto"}} />
            
          </div>

          <div className="service-card">
            <div>
            <h3>👨‍⚕️ For Customers</h3>
            <ul>
              <li>Easy Medicine Search</li>
              <li>Nearby Medical Stores</li>
              <li>Quick Availability Check</li>
              <li>Better Service</li>
            </ul>
            </div>
            <img src="forcustomer.png" alt="" style={{width: "200px", height: "auto"}}/>
            
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us">
        <h2>Why Choose Us</h2>

        <div className="features-grid">
          <div style={{display:"flex", alignItems:"center"}}><InsertInvitationIcon fontSize= "large" style={{color:"blue"}}/> <p>Real-Time Inventory</p></div>
          
          <div>✅ Expiry Alerts</div>
          <div>✅ Order Management</div>
          <div>✅ Distributor Dashboard</div>
          <div>✅ Shopkeeper Dashboard</div>
          <div>✅ Secure Platform</div>
          <div>✅ Easy To Use</div>
          <div>✅ Fast Support</div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stat-box">
          <h2>1000+</h2>
          <p>Medicines</p>
        </div>

        <div className="stat-box">
          <h2>500+</h2>
          <p>Shopkeepers</p>
        </div>

        <div className="stat-box">
          <h2>100+</h2>
          <p>Distributors</p>
        </div>

        <div className="stat-box">
          <h2>24/7</h2>
          <p>Support</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Join OmSanjeevani Today</h2>

        <p>
          Transform your medicine business with our smart healthcare platform.
        </p>

        <button>Get Started</button>
      </section>

    </div>
    <Footer/>
    </>
  );
};

export default About;