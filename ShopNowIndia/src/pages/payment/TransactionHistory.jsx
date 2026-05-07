import React, { useEffect, useState } from "react";
import "./TransactionHistory.css";

const TransactionHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

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
              <tr key={item.id}>
                <td>#{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>

                <td
                  className={
                    item.status === "Approved"
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