import React from "react";
import "./Features.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

const Features = () => {
  return (
    <>
    <Navbar/>
    <div className="features-page">

      <div className="features-hero">
        <h1>Our Features</h1>
        <p>
          Smart Medicine Distribution Platform for
          Distributors, Shopkeepers and Customers
        </p>
      </div>

      <div className="features-container">

        <div className="feature-card">
          <h3>📦 Inventory Management</h3>
          <p>
            Track medicine stock and manage inventory easily.
          </p>
        </div>

        <div className="feature-card">
          <h3>⚠️ Expiry Alerts</h3>
          <p>
            Get notifications for medicines nearing expiry.
          </p>
        </div>

        <div className="feature-card">
          <h3>📊 Distributor Dashboard</h3>
          <p>
            Manage products, orders and sales reports.
          </p>
        </div>

        <div className="feature-card">
          <h3>🏪 Shopkeeper Dashboard</h3>
          <p>
            Place orders and monitor inventory in real time.
          </p>
        </div>

        <div className="feature-card">
          <h3>🛒 Easy Ordering</h3>
          <p>
            Quick and hassle-free medicine ordering process.
          </p>
        </div>

        <div className="feature-card">
          <h3>🔒 Secure Platform</h3>
          <p>
            Secure login and protected business data.
          </p>
        </div>

      </div>

    </div>
    <Footer/>
    </>
  );
};

export default Features;