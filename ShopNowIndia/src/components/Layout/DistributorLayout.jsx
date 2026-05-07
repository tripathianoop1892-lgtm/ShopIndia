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

    </div>
  );
};

export default DistributorLayout;