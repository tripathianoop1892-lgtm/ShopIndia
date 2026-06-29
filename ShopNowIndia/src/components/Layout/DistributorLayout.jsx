<<<<<<< HEAD
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
=======
import React from "react";
import { Outlet } from "react-router-dom";
import DistributorSidebar from "../Sidebar/DistributorSidebar";
import Header from "../Header/Header";

const DistributorLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* Sidebar */}
      <DistributorSidebar />

      {/* Right Side */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <Header />

        {/* 🔥 MAIN FIX */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",   // 🔥 scroll enable
            padding: "20px",
            background: "#f5f7fb"
          }}
        >
          <Outlet />
        </div>

      </div>

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    </div>
  );
};

export default DistributorLayout;