import React, { useEffect, useState } from "react";
import "./Shopkeeper.css";
import { getOrders, updateOrder } from "../../services/api";
import { shortId, formatDate, statusColor } from "../../utils/helpers";

const ShopkeeperOrder = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("b2c-retail"); // 'b2c-retail' or 'b2b-procure'
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, [activeTab]);

  const fetchHistory = async () => {
    try {
      const filter = activeTab === "b2b-procure" ? "b2b-purchases" : "b2c-retail";
      const data = await getOrders(filter);
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  // Dynamic execution action pipeline for B2C Retail Orders (Mirrors Wholesaler Logic)
  const updateStatus = async (id, status) => {
    try {
      setActionLoading(true);
      const res = await updateOrder(id, status);
      
      if (res.success) {
        alert(`Retail Order successfully marked as ${status}`);
        fetchHistory(); // Refresh table state context
      } else {
        alert(res.message || "Failed to update retail order status");
      }
    } catch (err) {
      console.error("Pipeline status switch exception:", err);
      alert("Network exception updating order parameter.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="bigdiv" style={{ padding: "20px" }}>
      <h2>📋 Order Management Ledger</h2>
      
      {/* Tabs configuration logic */}
      <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
        <button 
          onClick={() => setActiveTab("b2c-retail")}
          style={{ padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "bold", background: activeTab === "b2c-retail" ? "#2563eb" : "#cbd5e1", color: activeTab === "b2c-retail" ? "white" : "black" }}
        >
          Customer Retail Orders (B2C)
        </button>
        <button 
          onClick={() => setActiveTab("b2b-procure")}
          style={{ padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "bold", background: activeTab === "b2b-procure" ? "#2563eb" : "#cbd5e1", color: activeTab === "b2b-procure" ? "white" : "black" }}
        >
          Wholesaler Supply Orders (B2B)
        </button>
      </div>

      <div className="table-container" style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
          <thead>
            <tr style={{ background: "#f8fafc", height: "45px" }}>
              <th>Order ID</th>
              <th>{activeTab === "b2b-procure" ? "Wholesaler Distributor" : "Customer Client Name"}</th>
              <th>Items Detail Count</th>
              <th>Invoice Sum</th>
              <th>Status</th>
              <th>Date Timestamp</th>
              {/* Dynamic Action Header added exclusively for incoming B2C traffic metrics */}
              {activeTab === "b2c-retail" && <th>Action Pipeline</th>}
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={activeTab === "b2c-retail" ? "7" : "6"} style={{ padding: "20px", color: "#94a3b8" }}>
                  No execution ledger found matching parameter parameters.
                </td>
              </tr>
            ) : (
              orders.map(o => (
                <tr key={o._id} style={{ borderBottom: "1px solid #eee", height: "50px" }}>
                  <td>#{shortId(o._id)}</td>
                  <td>{activeTab === "b2b-procure" ? (o.sellerId?.name || o.company || "Distributor Entity") : (o.customerName || "Consumer")}</td>
                  <td style={{ textAlign: "left", paddingLeft: "10px" }}>
                    {o.items?.map((item, idx) => (
                      <div key={idx} style={{ fontSize: "13px" }}>{item.name} (x{item.quantity})</div>
                    ))}
                  </td>
                  <td style={{ fontWeight: "bold", color: "#16a34a" }}>₹{Number(o.totalAmount || o.price || 0).toLocaleString('en-IN')}</td>
                  <td style={{ color: statusColor(o.status), fontWeight: "bold" }}>{o.status}</td>
                  <td>{formatDate(o.createdAt)}</td>
                  
                  {/* DYNAMIC WORKFLOW CONTROLS RENDERING */}
                  {activeTab === "b2c-retail" && (
                    <td>
                      {o.status === "Pending" ? (
                        <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                          <button
                            disabled={actionLoading}
                            onClick={() => updateStatus(o._id, "Approved")}
                            style={{ background: "#16a34a", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}
                          >
                            Approve
                          </button>
                          <button
                            disabled={actionLoading}
                            onClick={() => updateStatus(o._id, "Rejected")}
                            style={{ background: "#ef4444", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ color: "#64748b", fontSize: "13px", fontWeight: "500" }}>Settled Matrix</span>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShopkeeperOrder;