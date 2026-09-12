import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import CustomerSidebar from "../Sidebar/CustomerSidebar";
import useAuth from "../../hooks/useAuth";
import "./CustomerLayout.css";

const CustomerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isCustomer } = useAuth();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!sidebarOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("customer-navigation-open");

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("customer-navigation-open");
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 900px)");
    const closeAfterDesktopResize = (event) => {
      if (!event.matches) setSidebarOpen(false);
    };

    mobileViewport.addEventListener("change", closeAfterDesktopResize);
    return () => mobileViewport.removeEventListener("change", closeAfterDesktopResize);
  }, []);

  // Protect path isolation boundaries securely
  if (!token || !isCustomer) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="customer-layout">
      <CustomerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <header className="customer-mobile-header">
        <button type="button" className="portal-menu-toggle" onClick={() => setSidebarOpen((open) => !open)} aria-label="Toggle navigation menu" aria-expanded={sidebarOpen}>
          <FaBars />
        </button>
        <img src="/omsanjeevani.png" alt="Om Sanjeevani" />
        <span>Customer portal</span>
      </header>
      <div className="customer-main-content">
        <Outlet />
      </div>
      {sidebarOpen && <button type="button" className="portal-sidebar-backdrop" aria-label="Close navigation menu" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default CustomerLayout;
