import React, { useEffect, useState } from "react";
import "./Customer.css";
import { getOrders } from "../../services/api";
import { shortId, formatDate, statusColor } from "../../utils/helpers";
import { FaReceipt, FaBoxes, FaSpinner, FaExchangeAlt, FaShoppingBag } from "react-icons/fa";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error compilation across customer retail data sheets:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="earnings-loading-wrapper" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "70px 30px", textAlign: "center" }}>
        <FaSpinner className="spinner-icon" style={{ animation: "loadingSpinKeyframe 1s linear infinite", fontSize: "36px", color: "#3b82f6", marginBottom: "20px" }} />
        <h3>Balancing Multi-Channel Consumer Cash Books...</h3>
        <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>Analyzing automated retail consumer fulfillment ledger registries</p>
      </div>
    );
  }

  return (
    <div className="bigdiv" style={{ padding: "20px" }}>
      <div className="earnings-dashboard-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "35px", borderBottom: "1px solid #e2e8f0", paddingBottom: "22px" }}>
        <div>
          <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#1e293b", margin: "0 0 6px 0" }}>📦 My Shopping Orders Ledger</h2>
          <p style={{ color: "#64748b", margin: 0, fontSize: "15px" }}>Real-time statement auditing transactions intersecting retail customer fulfillment rows.</p>
        </div>
        <div className="realtime-status-pill" style={{ display: "flex", alignItems: "center", gap: "8px", background: "#ffffff", border: "1px solid #e2e8f0", padding: "8px 16px", borderRadius: "9999px", fontSize: "13px", fontWeight: 600, color: "#475569" }}>
          <span className="pulse-dot" style={{ width: "8px", height: "8px", backgroundColor: "#10b981", borderRadius: "50%" }}></span> Verified Node
        </div>
      </div>

      {/* SYSTEM STATE MATRIX JOURNAL */}
      <div className="history-ledger-section-block" style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "26px", boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)" }}>
        <div className="ledger-block-header" style={{ marginBottom: "24px", borderBottom: "1px solid #e2e8f0", paddingBottom: "18px" }}>
          <div className="title-row-flex" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <FaExchangeAlt className="section-title-icon" style={{ fontSize: "20px", color: "#475569" }} />
            <div>
              <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Unified Account Statement Journal</h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Comprehensive execution tracking ledger matched against active digital storefront lines.</p>
            </div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="empty-ledger-state" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "70px 30px", textAlign: "center" }}>
            <FaShoppingBag className="empty-illustration" style={{ fontSize: "48px", marginBottom: "16px", color: "#94a3b8" }} />
            <h4>Account Statement Blank</h4>
            <p style={{ margin: 0, fontSize: "14px", color: "#64748b", maxWidth: "400px" }}>No systemic operational retail transactions have been processed by this marketplace client account yet.</p>
          </div>
        ) : (
          <div className="ledger-table-overflow-box" style={{ overflowX: "auto" }}>
            <table className="professional-ledger-table" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr>
                  <th style={{ background: "#f8fafc", color: "#475569", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", padding: "14px 20px", borderBottom: "2px solid #e2e8f0" }}>Transaction ID</th>
                  <th style={{ background: "#f8fafc", color: "#475569", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", padding: "14px 20px", borderBottom: "2px solid #e2e8f0" }}>Pharmacy Store Node</th>
                  <th style={{ background: "#f8fafc", color: "#475569", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", padding: "14px 20px", borderBottom: "2px solid #e2e8f0" }}>Items Detail Count</th>
                  <th style={{ background: "#f8fafc", color: "#475569", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", padding: "14px 20px", borderBottom: "2px solid #e2e8f0" }}>Date Timestamp</th>
                  <th style={{ background: "#f8fafc", color: "#475569", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", padding: "14px 20px", borderBottom: "2px solid #e2e8f0", textAlign: "center" }}>Pipeline State</th>
                  <th style={{ background: "#f8fafc", color: "#475569", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", padding: "14px 20px", borderBottom: "2px solid #e2e8f0", textAlign: "right" }}>Invoice Total sum</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id} className="ledger-interactive-row" style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td className="monospace-cell-id" style={{ padding: "16px 20px", fontFamily: "'SFMono-Regular', Consolas, monospace", fontWeight: 600, color: "#64748b", fontSize: "13px" }}>
                      #{shortId(o._id)?.toUpperCase()}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "14px", color: "#0f172a", fontWeight: 600 }}>
                      {o.sellerId?.name || "OmSanjeevani Local Pharmacy"}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "14px", color: "#4a5568" }}>
                      {o.items?.map((item, idx) => (
                        <div key={idx} style={{ fontSize: "13px" }}>
                          <FaBoxes style={{ marginRight: "6px", color: "#94a3b8", fontSize: "11px" }} />
                          <strong>{item.name}</strong> (x{item.quantity}) @ ₹{Number(item.price || 0).toLocaleString('en-IN')}/unit
                        </div>
                      ))}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "14px", color: "#475569" }}>
                      {formatDate(o.createdAt)}
                    </td>
                    <td style={{ padding: "16px 20px", textAlign: "center" }}>
                      <span className={`badge-status ${o.status?.toLowerCase() === "approved" || o.status?.toLowerCase() === "delivered" ? "settled" : o.status?.toLowerCase() === "pending" ? "pending" : "cancelled"}`}>
                        {o.status}
                      </span>
                    </td>
                    {o.status === "delivered" ? (
                      <></>
                                ) : (
                                 <></>
                               )}
                    <td className="text-right table-bold-amount credit-color" style={{ padding: "16px 20px", textAlign: "right", fontWeight: 700, fontSize: "15px", color: "#16a34a" }}>
                      {/* CRITICAL DATA STRUCTURAL PARAMETER ALIGNMENT FIX */}
                      ₹{Number(o.totalAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
    </div>
  );
};

export default CustomerOrders;