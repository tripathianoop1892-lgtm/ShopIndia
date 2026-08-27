import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

import "./Layout.css";

const Layout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 768);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout">

      <Sidebar isOpen={sidebarOpen} />

      <div
        className={`main-content ${
          sidebarOpen ? "sidebar-open" : "sidebar-close"
        }`}
      >
        <Header toggleSidebar={toggleSidebar} />

        <div className="page-content">
          <Outlet />
        </div>

      </div>
      {sidebarOpen && <button type="button" className="admin-sidebar-backdrop" aria-label="Close navigation menu" onClick={toggleSidebar} />}

    </div>
  );
};

export default Layout;
