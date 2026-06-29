import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import ShopkeeperSidebar from "../Sidebar/ShopkeeperSidebar";
import useAuth from "../../hooks/useAuth";

const ShopkeeperLayout = () => {
  const { user, isShopkeeper } = useAuth();
  const token = localStorage.getItem("token");

  // Auth Guard: If no session tokens or roles match, push back cleanly to landing login login
  if (!token || !isShopkeeper) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="shopkeeper-layout" style={{ display: "flex", minHeight: "100vh", width: "98.5vw" }}>
      {/* Sidebar Layout Navigation View */}
      <ShopkeeperSidebar />

      {/* Main Container Right view-port wrapper box */}
      <div 
        className="shopkeeper-main-content" 
        style={{ 
          flex: 1, 
          marginLeft: "220px", // Exact width alignment match for standard layout fixed sidebar 
          padding: "20px",
          background: "#f4f7fb",
          minHeight: "100vh",
          boxSizing: "border-box"
        }}
      >
        <div className="shopkeeper-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ShopkeeperLayout;