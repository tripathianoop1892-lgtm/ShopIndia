import React, { useEffect, useState } from "react";
import "./Customer.css";
import { getOrders, submitReview } from "../../services/api"; // Make sure submitReview is exported from api.js
import { shortId, formatDate } from "../../utils/helpers";
import { FaReceipt, FaBoxes, FaSpinner, FaExchangeAlt, FaShoppingBag, FaStar } from "react-icons/fa";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Review Functionality States ---
  const [reviewModal, setReviewModal] = useState({ isOpen: false, medicineId: null, name: "" });
  const [reviewForm, setReviewForm] = useState({ rating: 5, reviewText: "" });

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

  // --- Handle Review Submission ---\
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await submitReview({
        targetId: reviewModal.medicineId, // <-- Change this to targetId
        targetModel: "Medicine",          // <-- Add targetModel explicitly
        rating: reviewForm.rating,
        reviewText: reviewForm.reviewText
      });

      alert(res.message || "Review submitted successfully!");

      if (res.success) {
        setReviewModal({ isOpen: false, medicineId: null, name: "" });
        setReviewForm({ rating: 5, reviewText: "" });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
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
                        <div key={idx} style={{ fontSize: "13px", marginBottom: "8px" }}>
                          <FaBoxes style={{ marginRight: "6px", color: "#94a3b8", fontSize: "11px" }} />
                          <strong>{item.name}</strong> (x{item.quantity}) @ ₹{Number(item.price || 0).toLocaleString('en-IN')}/unit
                          
                          {/* CONDITIONAL REVIEW BUTTON */}
                          {o.status === "Approved" && (
                            <button 
                              onClick={() => setReviewModal({ isOpen: true, medicineId: item.medicineId, name: item.name })}
                              style={{
                                display: "block",
                                marginTop: "6px",
                                fontSize: "11px",
                                padding: "4px 8px",
                                background: "#eff6ff",
                                color: "#2563eb",
                                border: "1px solid #bfdbfe",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontWeight: "600"
                              }}
                            >
                              <FaStar style={{ marginBottom: "-2px", marginRight: "4px" }}/> Write Review
                            </button>
                          )}
                        </div>
                      ))}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "14px", color: "#475569" }}>
                      {formatDate(o.createdAt)}
                    </td>
                    <td style={{ padding: "16px 20px", textAlign: "center" }}>
                      <span className={`badge-status ${["paid", "approved", "delivered"].includes(o.status?.toLowerCase()) ? "settled" : o.status?.toLowerCase() === "pending" ? "pending" : "cancelled"}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="text-right table-bold-amount credit-color" style={{ padding: "16px 20px", textAlign: "right", fontWeight: 700, fontSize: "15px", color: "#16a34a" }}>
                      ₹{Number(o.totalAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- REVIEW MODAL OVERLAY --- */}
      {reviewModal.isOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
          <div style={{ background: "white", padding: "28px", borderRadius: "12px", width: "100%", maxWidth: "450px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}>
            <h3 style={{ marginTop: 0, color: "#0f172a", fontSize: "20px", fontWeight: "700" }}>Review Product</h3>
            <p style={{ color: "#64748b", fontSize: "14px", marginTop: "-10px", marginBottom: "20px" }}>{reviewModal.name}</p>
            
            <form onSubmit={handleReviewSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <label style={{ fontSize: "14px", fontWeight: "600", color: "#334155" }}>
                Rating (1-5):
                <input 
                  type="number" 
                  min="1" 
                  max="5" 
                  required 
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm({...reviewForm, rating: e.target.value})}
                  style={{ width: "100%", padding: "10px 14px", marginTop: "6px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none" }}
                />
              </label>
              
              <label style={{ fontSize: "14px", fontWeight: "600", color: "#334155" }}>
                Your Experience:
                <textarea 
                  rows="4" 
                  required
                  placeholder="How was the quality of this medicine?"
                  value={reviewForm.reviewText}
                  onChange={(e) => setReviewForm({...reviewForm, reviewText: e.target.value})}
                  style={{ width: "100%", padding: "10px 14px", marginTop: "6px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", resize: "none" }}
                />
              </label>
              
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "12px" }}>
                <button 
                  type="button" 
                  onClick={() => setReviewModal({isOpen: false, medicineId: null, name: ""})} 
                  style={{ padding: "10px 20px", cursor: "pointer", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: "6px", fontWeight: "600" }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: "10px 20px", background: "#2563eb", color: "white", border: "none", cursor: "pointer", borderRadius: "6px", fontWeight: "600" }}
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
