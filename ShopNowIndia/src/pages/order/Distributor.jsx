import React, { useEffect, useState } from "react";
import "./Distributor.css";
import { getOrders } from "../../services/api";
import { shortId, statusColor } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

const Distributor = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  /* Retained only as historical reference for the removed seller approval flow.
  async function fetchOrders() {
    try {
      const data = await getOrders(); 
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  }
  */

  useEffect(() => {
    getOrders().then((data) => setOrders(Array.isArray(data) ? data : [])).catch(console.error);
  }, []);

  /* Removed: payment is the order commitment; sellers do not approve or reject paid orders.
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
  */

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

                  <td><button onClick={() => navigate(`/distributor/payments/${item._id}`)} style={{ background: "#2563eb", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>View Details</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ padding: "20px", color: "#94a3b8" }}>No active B2B wholesale orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Distributor;
