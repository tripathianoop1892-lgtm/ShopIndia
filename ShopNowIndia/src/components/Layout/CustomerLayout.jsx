import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import CustomerSidebar from "../Sidebar/CustomerSidebar";
import useAuth from "../../hooks/useAuth";
import "./CustomerLayout.css";

const CustomerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isCustomer } = useAuth();
  const token = localStorage.getItem("token");

  // Protect path isolation boundaries securely
  if (!token || !isCustomer) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="customer-layout">
      <CustomerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <button type="button" className="portal-menu-toggle" onClick={() => setSidebarOpen(true)} aria-label="Open navigation menu">
        <FaBars />
      </button>
      <div className="customer-main-content">
        <Outlet />
      </div>
      {sidebarOpen && <button type="button" className="portal-sidebar-backdrop" aria-label="Close navigation menu" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default CustomerLayout;
