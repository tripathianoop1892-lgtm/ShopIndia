<<<<<<< HEAD
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./DistributorSidebar.css";

const DistributorSidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
=======
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./distributorsidebar.css";

const DistributorSidebar = () => {

  const navigate = useNavigate();

  // 🔥 Mobile Sidebar
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    localStorage.clear();
    navigate("/");
  };

<<<<<<< HEAD
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
=======
  // 🔥 Close sidebar after click on mobile
  const closeSidebar = () => {
    if (window.innerWidth <= 768) {
      setOpen(false);
    }
  };

  return (
    <>

      {/* 🔥 MOBILE BUTTON */}
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* 🔥 SIDEBAR */}
      <div className={`sidebar ${open ? "open" : ""}`}>
<img
  src="/omsanjeevani.png"
  alt="OmSanjeevani"
  className="sidebar-logo"
/>


        <ul>

          <li>
            <NavLink
              to="/distributor"
              onClick={closeSidebar}
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/distributor/add-medicine"
              onClick={closeSidebar}
            >
              Add Medicine
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/distributor/medicines"
              onClick={closeSidebar}
            >
              My Medicines
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/distributor/orders"
              onClick={closeSidebar}
            >
              Orders
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/distributor/stock"
              onClick={closeSidebar}
            >
              Stock Update
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/distributor/low-stock"
              onClick={closeSidebar}
            >
              Low Stock
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/distributor/expiring"
              onClick={closeSidebar}
            >
              Expiring Soon
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/distributor/earnings"
              onClick={closeSidebar}
            >
              Earnings
            </NavLink>
          </li>

        </ul>

        {/* 🔴 Logout */}
        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </>
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
  );
};

export default DistributorSidebar;