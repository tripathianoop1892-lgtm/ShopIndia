import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import useAuth from "../../../hooks/UseAuth";

import "./layout.css";

const Layout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 768);
  const { isAdmin } = useAuth();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 768px)");
    const closeForMobile = (event) => {
      if (event.matches) setSidebarOpen(false);
    };

    mobileViewport.addEventListener("change", closeForMobile);
    return () => mobileViewport.removeEventListener("change", closeForMobile);
  }, []);

  useEffect(() => {
    if (!sidebarOpen || !window.matchMedia("(max-width: 768px)").matches) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("admin-navigation-open");
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("admin-navigation-open");
    };
  }, [sidebarOpen]);

  if (!token || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  const toggleSidebar = () => {
    setSidebarOpen((open) => !open);
  };

  return (
    <div className="admin-layout">

      <Sidebar isOpen={sidebarOpen} onNavigate={() => {
        if (window.innerWidth <= 768) setSidebarOpen(false);
      }} />

      <div
        className={`admin-main-content ${
          sidebarOpen ? "admin-sidebar-open" : "admin-sidebar-close"
        }`}
      >
        <Header toggleSidebar={toggleSidebar} />

        <div className="admin-page-content">
          <Outlet />
        </div>

      </div>
      {sidebarOpen && <button type="button" className="admin-sidebar-backdrop" aria-label="Close navigation menu" onClick={toggleSidebar} />}

    </div>
  );
};

export default Layout;
