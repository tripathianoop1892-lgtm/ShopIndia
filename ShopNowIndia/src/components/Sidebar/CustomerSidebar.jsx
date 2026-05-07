import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./CustomerSidebar.css";

const CustomerSidebar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
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
    </div>
  );
};

export default CustomerSidebar;