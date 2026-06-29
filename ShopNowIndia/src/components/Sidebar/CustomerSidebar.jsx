import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import useAuth from "../../hooks/useAuth";
import "./CustomerSidebar.css";

const CustomerSidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
=======
import "./CustomerSidebar.css";

const CustomerSidebar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    localStorage.clear();
    navigate("/");
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="sidebar">
      <h2 className="logo">Customer</h2>

      <ul>
        <li>
          <NavLink to="/customer">Dashboard</NavLink>
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
      </ul>

      {/* 🔥 LOGIN / LOGOUT */}
      {!user ? (
        <button className="login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      ) : (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    </div>
  );
};

export default CustomerSidebar;