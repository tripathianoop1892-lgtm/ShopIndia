import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import DistributorSidebar from "../Sidebar/DistributorSidebar";
import useAuth from "../../hooks/useAuth";
import "./DistributorLayout.css";

const DistributorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDistributor } = useAuth();
  const token = localStorage.getItem("token");

  if (!token || !isDistributor) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="distributor-layout">
      <DistributorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="distributor-main-section">
        <button
          type="button"
          className="distributor-menu-toggle"
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label="Open sidebar"
          aria-expanded={sidebarOpen}
        >
          <FaBars />
        </button>

        <main className="distributor-content">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && <button type="button" className="distributor-sidebar-backdrop" aria-label="Close sidebar" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default DistributorLayout;
