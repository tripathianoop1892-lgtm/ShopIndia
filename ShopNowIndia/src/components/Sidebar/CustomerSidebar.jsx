import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./CustomerSidebar.css";

const CustomerSidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className={`customer-sidebar ${isOpen ? "open" : ""}`}>
      <div className="customer-sidebar-header">
        <div>
          <img src="/omsanjeevani.png" alt="Wholesale Hub" className="customer-sidebar-logo" />
        </div>
        <button type="button" className="customer-sidebar-close" onClick={onClose} aria-label="Close sidebar">
          ✕
        </button>
      </div>
      <div>
        <ul>
          <li>
            <NavLink to="/customer" end>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/customer/medicines">Medicines</NavLink>
          </li>
          <li>
            <NavLink to="/customer/cart">Cart</NavLink>
          </li>          
          <li>
            <NavLink to="/customer/orders">Orders</NavLink>
          </li>          
          <li>
            <NavLink to="/customer/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/customer/settings">Settings</NavLink>
          </li>
        </ul>
      </div>

      <div style={{ padding: "0 14px", marginTop: "15px" }}>
        <button onClick={handleLogout} className="customer-logout-btn">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default CustomerSidebar;