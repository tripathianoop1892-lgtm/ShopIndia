import React from "react";
<<<<<<< HEAD
import { Outlet, Navigate } from "react-router-dom";
import CustomerSidebar from "../Sidebar/CustomerSidebar";
import useAuth from "../../hooks/useAuth";

const CustomerLayout = () => {
  const { isCustomer } = useAuth();
  const token = localStorage.getItem("token");

  // Protect path isolation boundaries securely
  if (!token || !isCustomer) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="layout" style={{ display: "flex", minHeight: "100vh", width: "98vw" }}>
      <CustomerSidebar />
      <div 
        className="main-content" 
        style={{ 
          flex: 1, 
          marginLeft: "220px", 
          padding: "20px",
          background: "#f8fafc",
          minHeight: "100vh",
          boxSizing: "border-box"
        }}
      >
        <Outlet />
      </div>
=======
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

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    </div>
  );
};

export default CustomerLayout;