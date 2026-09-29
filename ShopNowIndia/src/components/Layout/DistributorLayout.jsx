import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import DistributorSidebar from "../Sidebar/DistributorSidebar";
import useAuth from "../../hooks/useAuth";
import PortalHeader from "./PortalHeader";
import "./DistributorLayout.css";

const DistributorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDistributor } = useAuth();
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

  if (!token || !isDistributor) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="distributor-layout">
      <DistributorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="distributor-main-section">
        <PortalHeader
          portalName="Distributor portal"
          notificationPath="/distributor/notifications"
          profilePath="/distributor/profile"
          onMenuClick={() => setSidebarOpen((open) => !open)}
          menuOpen={sidebarOpen}
        />

        <main className="distributor-content">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && <button type="button" className="distributor-sidebar-backdrop" aria-label="Close sidebar" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default DistributorLayout;
