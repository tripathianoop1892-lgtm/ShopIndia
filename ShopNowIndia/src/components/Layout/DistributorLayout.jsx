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
    <div className={`layout ${sidebarOpen ? "sidebar-open" : ""}`}>
      <DistributorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main-section">
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <FaBars />
        </button>

        <main className="content">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default DistributorLayout;