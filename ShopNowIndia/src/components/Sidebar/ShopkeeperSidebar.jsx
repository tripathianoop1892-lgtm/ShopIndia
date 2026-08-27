import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./ShopkeeperSidebar.css";

const ShopkeeperSidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); localStorage.clear(); navigate("/"); };
  const links = [
    ["/shopkeeper", "Dashboard", true],
    ["/shopkeeper/medicine-list", "Medicines Inventory"],
    ["/shopkeeper/add-medicine", "Add Medicine"],
    ["/shopkeeper/cart", "Cart"],
    ["/shopkeeper/orders", "Orders"],
    ["/shopkeeper/earnings", "Earnings"],
    ["/shopkeeper/qr", "Store QR Code"],
    ["/shopkeeper/profile", "Profile"],
    ["/shopkeeper/settings", "Settings"],
  ];

  return <aside className={`shopkeeper-sidebar ${isOpen ? "open" : ""}`}>
    <div className="shopkeeper-sidebar-header"><img src="/omsanjeevani.png" alt="Om Sanjeevani" className="shopkeeper-sidebar-logo" /><button type="button" className="shopkeeper-sidebar-close" onClick={onClose} aria-label="Close navigation menu">×</button></div>
    <nav aria-label="Shopkeeper navigation"><ul>{links.map(([to, label, end]) => <li key={to}><NavLink to={to} end={end} onClick={onClose}>{label}</NavLink></li>)}</ul></nav>
    <div className="shopkeeper-sidebar-footer"><button type="button" onClick={handleLogout} className="logout-btn">Sign Out</button></div>
  </aside>;
};

export default ShopkeeperSidebar;
