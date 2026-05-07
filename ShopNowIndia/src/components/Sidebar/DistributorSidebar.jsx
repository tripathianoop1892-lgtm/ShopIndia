import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./distributorsidebar.css";

const DistributorSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2>ShopNowIndia</h2>

      <ul>
        <li><NavLink to="/distributor">Dashboard</NavLink></li>

        <li><NavLink to="/distributor/add-medicine">Add Medicine</NavLink></li>

        <li><NavLink to="/distributor/medicines">My Medicines</NavLink></li>

        <li><NavLink to="/distributor/orders">Orders</NavLink></li>

        <li><NavLink to="/distributor/stock">Stock Update</NavLink></li>

        <li><NavLink to="/distributor/low-stock">Low Stock</NavLink></li>

        <li><NavLink to="/distributor/expiring">Expiring Soon</NavLink></li>

        <li><NavLink to="/distributor/earnings">Earnings</NavLink></li>
      </ul>

      {/* 🔴 Logout */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default DistributorSidebar;