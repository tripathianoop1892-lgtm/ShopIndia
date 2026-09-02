import React, { useEffect, useState } from "react";
import "./TransactionHistory.css";
import { getOrders } from "../../services/api";

const TransactionHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Unable to load transactions:", error));
  }, []);

  return (
    <div className="history-container">
      <h2>💰 Transaction History</h2>

      <table className="history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Medicine</th>
            <th>Qty</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((item) => (
              <tr key={item._id}>
                <td>#{item._id.slice(-8)}</td>
                <td>{item.items?.map((medicine) => medicine.name).join(", ") || "—"}</td>
                <td>{item.items?.reduce((sum, medicine) => sum + Number(medicine.quantity || 0), 0) || 0}</td>
                <td>₹{Number(item.finalAmount ?? item.totalAmount ?? 0).toLocaleString("en-IN")}</td>

                <td
                  className={
                    item.status === "Paid" || item.status === "Approved"
                      ? "success"
                      : item.status === "Rejected"
                      ? "failed"
                      : "pending"
                  }
                >
                  {item.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Transactions Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
