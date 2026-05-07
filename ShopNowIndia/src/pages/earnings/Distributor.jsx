import React, { useEffect, useState } from "react";
import "./Distributor.css";

const Earnings = () => {
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]); // 🔥 history state

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/earnings");
      const data = await res.json();

      console.log("Earnings Data:", data);

      setTotal(data.total || 0);
      setOrders(data.orders || []); // 🔥 history
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="container">
      <h2>Total Earnings</h2>

      {/* 🔥 TOTAL CARD */}
      <div className="card">
        ₹ {total}
      </div>

      {/* 🔥 HISTORY */}
      <h3 style={{ marginTop: "25px" }}>Earnings History</h3>

      {orders.length === 0 ? (
        <p>No history</p>
      ) : (
        orders.map((o) => (
          <div key={o._id} className="history-item">
            <span>₹ {o.total}</span>
            <span>{new Date(o.createdAt).toLocaleDateString()}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Earnings;