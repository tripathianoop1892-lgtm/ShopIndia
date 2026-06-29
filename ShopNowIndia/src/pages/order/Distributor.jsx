import React, { useEffect, useState } from "react";
import "./Distributor.css";
<<<<<<< HEAD
import { getOrders, updateOrder } from "../../services/api"; 
=======
import { getOrders, updateOrder } from "../../services/api"; // ✅ FIX
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
import { shortId, statusColor } from "../../utils/helpers";

const Distributor = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

<<<<<<< HEAD
  const fetchOrders = async () => {
    try {
      const data = await getOrders(); 
      setOrders(Array.isArray(data) ? data : []);
=======
  // 🔥 GET ORDERS
  const fetchOrders = async () => {
    try {
      const data = await getOrders(); // ✅ FIX
      setOrders(data);
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    } catch (err) {
      console.log(err);
    }
  };

<<<<<<< HEAD
  const updateStatus = async (id, status) => {
    try {
      const res = await updateOrder(id, status); 
      if (res.success) {
        alert(`Order successfully marked as ${status} ✅`);
        fetchOrders(); // Refresh lists to show current status matrix
      } else {
        alert(res.message || "Failed to update order status");
      }
=======
  // 🔥 UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await updateOrder(id, status); // ✅ FIX
      fetchOrders();
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    } catch (err) {
      console.log(err);
    }
  };

  return (
<<<<<<< HEAD
    <div className="order-container" style={{ padding: "20px" }}>
      <h2>📥 Incoming Shopkeeper B2B Bulk Orders</h2>
=======
    <div className="order-container">
      <h2>Shopkeeper Orders</h2>
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec

      <table>
        <thead>
          <tr>
<<<<<<< HEAD
            <th>Order ID</th>
            <th>Shopkeeper Name</th>
            <th>Medicines Requested</th>
            <th>Total Amount</th>
=======
            <th>ID</th>
            <th>Shopkeeper Name</th>
            <th>Medicine</th>
            <th>Qty</th>
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((item) => (
              <tr key={item._id}>
<<<<<<< HEAD
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
=======
                
                <td>{shortId(item._id)}</td>

                <td>{item.shopkeeperName || "N/A"}</td>

                <td>{item.name}</td>

                <td>{item.quantity}</td>

                <td style={{ color: statusColor(item.status) }}>
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
                  {item.status}
                </td>

                <td>
<<<<<<< HEAD
                  {item.status === "Pending" ? (
                    <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                      <button
                        onClick={() => updateStatus(item._id, "Approved")}
                        style={{ background: "#16a34a", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
=======
                  {item.status === "Pending" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(item._id, "Approved")
                        }
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
                      >
                        Approve
                      </button>

                      <button
<<<<<<< HEAD
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
=======
                        onClick={() =>
                          updateStatus(item._id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
              </tr>
            ))
          ) : (
            <tr>
<<<<<<< HEAD
              <td colSpan="6" style={{ padding: "20px", color: "#94a3b8" }}>No active B2B wholesale orders found.</td>
=======
              <td colSpan="6">No Orders</td>
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Distributor;