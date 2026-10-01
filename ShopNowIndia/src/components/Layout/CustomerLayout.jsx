import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import CustomerSidebar from "../Sidebar/CustomerSidebar";
import PortalHeader from "./PortalHeader";
import useAuth from "../../hooks/UseAuth";
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
    document.body.classList.add("portal-navigation-open");

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("portal-navigation-open");
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
      <div className="customer-main-content">
        <PortalHeader
          portalName="Customer portal"
          notificationPath="/customer/notifications"
          profilePath="/customer/profile"
          onMenuClick={() => setSidebarOpen((open) => !open)}
          menuOpen={sidebarOpen}
        />
        <Outlet />
      </div>
      {sidebarOpen && <button type="button" className="portal-sidebar-backdrop" aria-label="Close navigation menu" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default CustomerLayout;
