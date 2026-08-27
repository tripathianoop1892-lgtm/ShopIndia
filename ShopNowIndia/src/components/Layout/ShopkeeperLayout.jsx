import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import ShopkeeperSidebar from "../Sidebar/ShopkeeperSidebar";
import useAuth from "../../hooks/useAuth";
import "./ShopkeeperLayout.css";

const ShopkeeperLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isShopkeeper } = useAuth();
  const token = localStorage.getItem("token");

  // Auth Guard: If no session tokens or roles match, push back cleanly to landing login login
  if (!token || !isShopkeeper) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="shopkeeper-layout">
      <ShopkeeperSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <button type="button" className="portal-menu-toggle" onClick={() => setSidebarOpen(true)} aria-label="Open navigation menu">
        <FaBars />
      </button>
      <div className="shopkeeper-main-content">
        <div className="shopkeeper-content">
          <Outlet />
        </div>
      </div>
      {sidebarOpen && <button type="button" className="portal-sidebar-backdrop" aria-label="Close navigation menu" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default ShopkeeperLayout;
