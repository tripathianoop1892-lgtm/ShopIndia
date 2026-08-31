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
            <NavLink to="/distributor" end onClick={onClose}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/distributor/medicine-list" onClick={onClose}>Medicines Inventory</NavLink>
          </li>
          <li>
            <NavLink to="/distributor/add-medicine" onClick={onClose}>Add Medicines</NavLink>
          </li>
          <li>
            <NavLink to="/distributor/orders" onClick={onClose}>Orders</NavLink>
          </li>
          <li>
            <NavLink to="/distributor/earnings" onClick={onClose}>Earnings</NavLink>
          </li>
          <li>
            <NavLink to="/distributor/notifications" onClick={onClose}>Notifications</NavLink>
          </li>
          <li>
            <NavLink to="/distributor/low-stock" onClick={onClose}>Low Stock</NavLink>
          </li>
          <li>
            <NavLink to="/distributor/stock" onClick={onClose}>Update Stock</NavLink>
          </li>
          <li>
            <NavLink to="/distributor/expiring" onClick={onClose}>Expiry Alert </NavLink>
          </li>
          <li>
            <NavLink to="/distributor/profile" onClick={onClose}>Profile</NavLink>
          </li>
          <li>
            <NavLink to="/distributor/settings" onClick={onClose}>Settings</NavLink>
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
