import React, { useEffect, useState } from "react";
import "./Distributor.css";

const Earnings = () => {
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      const res = await fetch("http://localhost:5000/api/earnings", { headers });
      const data = await res.json();

      console.log("Earnings Data:", data);

      setTotal(data.total || 0);
      setOrders(data.orders || []);
    } catch (err) {
      console.log("Error:", err);
      setTotal(0);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const approvedCount = orders.length;
  const averageOrder = approvedCount > 0 ? (total / approvedCount).toFixed(2) : 0;
  const lastOrder = orders.length > 0 ? new Date(orders[0].createdAt) : null;

  return (
    <div className="earnings-dashboard">
      {/* Header */}
      <div className="earnings-header">
        <div>
          <h1>💰 Distributor Earnings</h1>
          <p>Track your B2B wholesale revenue</p>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading earnings data...</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card total">
              <div className="stat-icon">💵</div>
              <div className="stat-content">
                <p className="stat-label">Total Earnings</p>
                <h2 className="stat-value">₹{total.toFixed(2)}</h2>
              </div>
            </div>

            <div className="stat-card orders">
              <div className="stat-icon">📦</div>
              <div className="stat-content">
                <p className="stat-label">Approved Orders</p>
                <h2 className="stat-value">{approvedCount}</h2>
              </div>
            </div>

            <div className="stat-card average">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <p className="stat-label">Average Order Value</p>
                <h2 className="stat-value">₹{averageOrder}</h2>
              </div>
            </div>

            <div className="stat-card recent">
              <div className="stat-icon">📅</div>
              <div className="stat-content">
                <p className="stat-label">Last Order</p>
                <h2 className="stat-value">
                  {lastOrder ? lastOrder.toLocaleDateString() : "N/A"}
                </h2>
              </div>
            </div>
          </div>

          {/* Earnings History */}
          <div className="earnings-section">
            <div className="section-header">
              <h2>📋 Earnings History</h2>
              <p>{approvedCount} approved orders</p>
            </div>

            {orders.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎯</div>
                <h3>No Earnings Yet</h3>
                <p>Approve orders from shopkeepers to see earnings here</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="earnings-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Shopkeeper</th>
                      <th>Items</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order._id} className="table-row">
                        <td className="row-number">{index + 1}</td>
                        <td className="shopkeeper-name">
                          {order.shopkeeperName || "Retail Pharmacy"}
                        </td>
                        <td className="items-count">
                          <span className="badge">{order.items?.length || 0} items</span>
                        </td>
                        <td className="amount">
                          <span className="amount-value">₹{order.totalAmount?.toFixed(2)}</span>
                        </td>
                        <td className="date">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Earnings;