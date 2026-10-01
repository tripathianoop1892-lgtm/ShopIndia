import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import ShopkeeperSidebar from "../Sidebar/ShopkeeperSidebar";
import useAuth from "../../hooks/UseAuth";
import PortalHeader from "./PortalHeader";
import "./ShopkeeperLayout.css";

const ShopkeeperLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isShopkeeper } = useAuth();
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

  // Auth Guard: If no session tokens or roles match, push back cleanly to landing login login
  if (!token || !isShopkeeper) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="shopkeeper-layout">
      <ShopkeeperSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="shopkeeper-main-content">
        <PortalHeader
          portalName="Shopkeeper portal"
          notificationPath="/shopkeeper/notifications"
          profilePath="/shopkeeper/profile"
          onMenuClick={() => setSidebarOpen((open) => !open)}
          menuOpen={sidebarOpen}
        />
        <div className="shopkeeper-content">
          <Outlet />
        </div>
      </div>
      {sidebarOpen && <button type="button" className="portal-sidebar-backdrop" aria-label="Close navigation menu" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default ShopkeeperLayout;
