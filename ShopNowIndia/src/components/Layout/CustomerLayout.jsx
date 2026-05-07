import React from "react";
import { Outlet } from "react-router-dom";
import CustomerSidebar from "../Sidebar/CustomerSidebar";
import Header from "../Header/Header";
import "./CustomerLayout.css";

const CustomerLayout = () => {
  return (
    <div className="layout">

      {/* Sidebar */}
      <CustomerSidebar />

      {/* Right Section */}
      <div className="main-section">

        {/* Header */}
        <Header />

        {/* Page Content */}
        <div className="main-content">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default CustomerLayout;