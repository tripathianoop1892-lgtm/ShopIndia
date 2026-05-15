import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./distributorsidebar.css";

const DistributorSidebar = () => {

  const navigate = useNavigate();

  // 🔥 Mobile Sidebar
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

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
  );
};

export default DistributorSidebar;