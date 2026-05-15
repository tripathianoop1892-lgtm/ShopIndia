import React from "react";
import "./Distributor.css";

const DistributorDashboard = () => {
  return (
    <div className="main">

      <h1>Distributor Dashboard</h1>
      <p>Anoop Medical Store • Shiamgir, India</p>

      {/* Cards */}
      <div className="cards">
        <div className="card blue">
          <h2>152</h2>
          <p>Total Medicines</p>
        </div>
        <div className="card green">
          <h2>120</h2>
          <p>In Stock</p>
        </div>
        <div className="card orange">
          <h2>12</h2>
          <p>Low Stock</p>
        </div>
        <div className="card red">
          <h2>8</h2>
          <p>Expiring Soon</p>
        </div>
        <div className="card purple">
          <h2>₹48,650</h2>
          <p>Total Earnings</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="section">
        <h3>Recent Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Shopkeeper</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#ORD-1001</td>
              <td>Sharma Medical</td>
              <td>₹2450</td>
              <td className="pending">Pending</td>
            </tr>
            <tr>
              <td>#ORD-1002</td>
              <td>Health Plus</td>
              <td>₹1870</td>
              <td className="confirmed">Confirmed</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Low Stock */}
      <div className="section">
        <h3>Low Stock Medicines</h3>
        <table>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Paracetamol 650mg</td>
              <td className="low">15</td>
              <td><button>Update</button></td>
            </tr>
            <tr>
              <td>Azithromycin</td>
              <td className="low">8</td>
              <td><button>Update</button></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default DistributorDashboard;