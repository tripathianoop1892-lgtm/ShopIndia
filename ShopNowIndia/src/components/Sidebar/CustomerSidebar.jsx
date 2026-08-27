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

  const navigationItems = [
    ["/customer", "Dashboard", true],
    ["/customer/medicines", "Medicines"],
    ["/customer/prescription", "Prescriptions"],
    ["/customer/cart", "Cart"],
    ["/customer/orders", "Orders"],
    ["/customer/notification", "Notifications"],
    ["/customer/profile", "Profile"],
    ["/customer/settings", "Settings"],
  ];

  return (
    <aside className={`customer-sidebar ${isOpen ? "open" : ""}`}>
      <div className="customer-sidebar-header">
        <img src="/omsanjeevani.png" alt="Om Sanjeevani" className="customer-sidebar-logo" />
        <button type="button" className="customer-sidebar-close" onClick={onClose} aria-label="Close navigation menu">×</button>
      </div>
      <nav aria-label="Customer navigation">
        <ul>
          {navigationItems.map(([to, label, end]) => (
            <li key={to}>
              <NavLink to={to} end={end} onClick={onClose}>{label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="customer-sidebar-footer">
        <button type="button" onClick={handleLogout} className="customer-logout-btn">Sign Out</button>
      </div>
    </aside>
  );
};

export default CustomerSidebar;
