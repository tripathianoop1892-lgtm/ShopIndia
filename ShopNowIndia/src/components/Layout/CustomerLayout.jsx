import React from "react";
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
    </div>
  );
};

export default CustomerLayout;