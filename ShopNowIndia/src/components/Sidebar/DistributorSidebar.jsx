import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./DistributorSidebar.css";

const DistributorSidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className={`distributor-sidebar ${isOpen ? "open" : ""}`}>
      <div className="distributor-sidebar-header">
        <div>
          <img src="/omsanjeevani.png" alt="Wholesale Hub" className="distributor-sidebar-logo" />
        </div>
        <button type="button" className="distributor-sidebar-close" onClick={onClose} aria-label="Close sidebar">
          ✕
        </button>
      </div>
      <div>
        <ul>
          <li>
            <NavLink to="/distributor" end>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/distributor/medicine-list">Medicines Inventory</NavLink>
          </li>
          <li>
            <NavLink to="/distributor/add-medicine">Add Medicines</NavLink>
          </li>
          <li>
            <NavLink to="/distributor/orders">Orders</NavLink>
          </li>
          <li>
            <NavLink to="/distributor/earnings">Earnings</NavLink>
          </li>
          <li>
            <NavLink to="/distributor/low-stock">Low Stock</NavLink>
          </li>
          <li>
            <NavLink to="/distributor/expiring">Expiry Alert </NavLink>
          </li>
          <li>
            <NavLink to="/distributor/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/distributor/settings">Settings</NavLink>
          </li>
        </ul>
      </div>

      <div style={{ padding: "0 14px" }}>
        <button onClick={handleLogout} className="logout-btn">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default DistributorSidebar;