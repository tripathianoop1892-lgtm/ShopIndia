import React from "react";
import { Outlet } from "react-router-dom";
import ShopkeeperSidebar from "../Sidebar/ShopkeeperSidebar";
import Header from "../Header/Header";
import "./ShopkeeperLayout.css";

const ShopkeeperLayout = () => {
  return (
    <div className="layout">

      {/* Sidebar */}
      <ShopkeeperSidebar />

      {/* Right Side */}
      <div className="main-content">

        {/* Header */}
        <Header />

        {/* 🔥 SCROLL FIX */}
        <div className="content">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default ShopkeeperLayout;