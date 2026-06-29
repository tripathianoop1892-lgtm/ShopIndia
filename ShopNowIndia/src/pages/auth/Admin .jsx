import React from "react";
import "./Admin.css";

const Admin = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="admin-container">
      <h2>Admin Panel 👑</h2>

      <div className="admin-card">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>

      <div className="admin-actions">
        <button>Manage Users</button>
        <button>View Medicines</button>
        <button>Delete Data</button>
      </div>
    </div>
  );
};

export default Admin;