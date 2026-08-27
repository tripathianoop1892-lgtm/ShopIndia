import React, { useEffect, useState } from "react";
import "./Distributor.css";
import { getOrders, updateOrder } from "../../services/api"; 
import { shortId, statusColor } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

const Distributor = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  async function fetchOrders() {
    try {
      const data = await getOrders(); 
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getOrders().then((data) => setOrders(Array.isArray(data) ? data : [])).catch(console.error);
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await updateOrder(id, status); 
      if (res.success) {
        alert(`Order successfully marked as ${status} ✅`);
        fetchOrders(); // Refresh lists to show current status matrix
      } else {
        alert(res.message || "Failed to update order status");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="order-container" style={{ padding: "20px" }}>
      <h2>📥 Incoming Shopkeeper B2B Bulk Orders</h2>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Shopkeeper Name</th>
            <th>Medicines Requested</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Action</th>
            <th>Payment</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((item) => (
              <tr key={item._id}>
                <td>#{shortId(item._id)}</td>
                <td>{item.shopkeeperName || "Retail Pharmacy"}</td>
                
                {/* Dynamically handle multi-item nested lines arrays */}
                <td style={{ textAlign: "left", paddingLeft: "20px" }}>
                  {item.items?.map((prod, idx) => (
                    <div key={idx} style={{ fontSize: "13px", margin: "2px 0" }}>
                      • <strong>{prod.name}</strong> (x{prod.quantity}) @ ₹{prod.price}/unit
                    </div>
                  ))}
                </td>

                <td style={{ fontWeight: "bold", color: "#16a34a" }}>₹{item.totalAmount}</td>
                
                <td style={{ color: statusColor(item.status), fontWeight: "bold" }}>
                  {item.status}
                </td>

                  <td>
                  {item.status === "Pending" ? (
                    <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                      <button
                        onClick={() => updateStatus(item._id, "Approved")}
                        style={{ background: "#16a34a", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(item._id, "Rejected")}
                        style={{ background: "#ef4444", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span style={{ color: "#64748b", fontSize: "13px" }}>Processed</span>
                  )}
                  </td>
                  <td><button onClick={() => navigate(`/distributor/payments/${item._id}`)} style={{ background: "#2563eb", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>View Details</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ padding: "20px", color: "#94a3b8" }}>No active B2B wholesale orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Distributor;
