import React, { useEffect, useState } from "react";
import "./Shopkeeper.css";
import { getOrders, submitReview, updateOrder } from "../../services/api";
import { shortId, formatDate, statusColor } from "../../utils/helpers";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ShopkeeperOrder = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("b2c-retail"); // 'b2c-retail' or 'b2b-procure'
  const [actionLoading, setActionLoading] = useState(false);
const [rejectModal, setRejectModal] = useState({
  isOpen: false,
  orderId: null,
});
const [rejectionReason, setRejectionReason] = useState("");
const [customRejectionReason, setCustomRejectionReason] = useState("");

  // --- Review State ---
  const [reviewModal, setReviewModal] = useState({ isOpen: false, targetId: null, targetName: "" });
  const [reviewForm, setReviewForm] = useState({ rating: 5, reviewText: "" });
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    const loadOrders = async () => {
      try {
        const filter = activeTab === "b2b-procure" ? "b2b-purchases" : "b2c-retail";
        const data = await getOrders(filter);
        if (!cancelled) setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) console.log(err);
      }
    };
    void loadOrders();
    return () => { cancelled = true; };
  }, [activeTab]);

  // --- Handle Review Submission ---
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await submitReview({
        targetId: reviewModal.targetId,
        targetModel: "User", // We are reviewing the Distributor (User)
        rating: reviewForm.rating,
        reviewText: reviewForm.reviewText
      });
      
      alert(res.message || "Review submitted successfully!");
      if (res.success) {
        setReviewModal({ isOpen: false, targetId: null, targetName: "" });
        setReviewForm({ rating: 5, reviewText: "" });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  };

  // --- B2C ORDER STATUS UPDATE ---
const updateStatus = async (id, status, reason = "") => {
  try {
    setActionLoading(true);

    const res = await updateOrder(id, status, reason);

    if (res.success) {
      alert(
        status === "Approved"
          ? "Order approved successfully."
          : "Order rejected successfully. Refund process initiated."
      );

      const filter =
        activeTab === "b2b-procure"
          ? "b2b-purchases"
          : "b2c-retail";

      const data = await getOrders(filter);
      setOrders(Array.isArray(data) ? data : []);

      setRejectModal({
        isOpen: false,
        orderId: null,
      });

      setRejectionReason("");
      setCustomRejectionReason("");
    } else {
      alert(res.message || "Failed to update order.");
    }
  } catch (error) {
    console.error("Order status update error:", error);
    alert("Network exception while updating order.");
  } finally {
    setActionLoading(false);
  }
};

// --- REJECT ORDER ---
const handleRejectSubmit = async (e) => {
  e.preventDefault();

  const finalReason =
    rejectionReason === "Other"
      ? customRejectionReason.trim()
      : rejectionReason;

  if (!finalReason) {
    alert("Please select or enter a rejection reason.");
    return;
  }

  if (finalReason.length > 500) {
    alert("Rejection reason cannot exceed 500 characters.");
    return;
  }

  await updateStatus(
    rejectModal.orderId,
    "Rejected",
    finalReason
  );
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
              <th> {activeTab === "b2b-procure"? "Wholesaler Distributor": "Customer Client Name"}</th>
              <th>Items Detail Count</th>
              <th>Invoice Sum</th>
              <th>Status</th>
              <th>Action</th>
              <th>Date Timestamp</th>
              <th>Payment</th>
                    </tr>
               </thead>
               <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ padding: "20px", color: "#94a3b8" }}>
                  No execution ledger found matching parameter parameters.
                </td>
              </tr>
            ) : (
              orders.map(o => (
                <tr key={o._id} style={{ borderBottom: "1px solid #eee", height: "50px" }}> 
                  <td>#{shortId(o._id)}</td> 
                  
                  {/* Distributor / Customer Name Column */}
                  <td>
                    {activeTab === "b2b-procure" ? (o.sellerId?.name || o.company || "Distributor Entity") : (o.customerName || "Consumer")}
                    
                    {/* Write Review Button for B2B Approved Orders */}
                    {activeTab === "b2b-procure" && o.status === "Approved" && (
                       <button 
                         onClick={() => setReviewModal({ isOpen: true, targetId: o.sellerId?._id, targetName: o.sellerId?.name })}
                         style={{ display: "block", margin: "6px auto 0", fontSize: "11px", padding: "4px 8px", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}
                       >
                         <FaStar style={{ marginBottom: "-2px", marginRight: "4px" }}/> Review Distributor
                       </button>
                    )}
                  </td>
                  
                  <td style={{ textAlign: "left", paddingLeft: "10px" }}>
                    {o.items?.map((item, idx) => (
                      <div key={idx} style={{ fontSize: "13px" }}>{item.name} (x{item.quantity})</div>
                    ))}
                  </td>
                  <td style={{ fontWeight: "bold", color: "#16a34a" }}>₹{Number(o.totalAmount || o.price || 0).toLocaleString('en-IN')}</td>
                <td style={{ color: statusColor(o.status), fontWeight: "bold" }}>
  {o.status}
</td>

<td>
  {activeTab === "b2c-retail" &&
  (o.status === "Paid" || o.status === "Pending") ? (
    <div className="order-action-buttons">
      <button
        className="approve-order-btn"
        disabled={actionLoading}
        onClick={() => updateStatus(o._id, "Approved")}
      >
        ✓ Approve
      </button>

      <button
        className="reject-order-btn"
        disabled={actionLoading}
        onClick={() =>
          setRejectModal({
            isOpen: true,
            orderId: o._id,
          })
        }
      >
        ✕ Reject
      </button>
    </div>
  ) : (
    <span className="no-order-action">—</span>
  )}
</td>

<td>{formatDate(o.createdAt)}</td>

<td>
  <button
    onClick={() =>

      navigate(
        `/shopkeeper/payments/${o._id}${
          activeTab === "b2b-procure" ? "?view=b2b-purchases" : ""
        }`
      )
    }
    style={{
      border: "none",
      borderRadius: "4px",
      padding: "6px 10px",
      background: "#2563eb",
      color: "white",
      cursor: "pointer",
      fontSize: "12px",
    }}
  >
    View Details
  </button>
</td>
</tr>
))
)}

</tbody>
</table>
</div>
  
      {/* --- REVIEW MODAL OVERLAY --- */}
      {reviewModal.isOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
          <div style={{ background: "white", padding: "28px", borderRadius: "12px", width: "100%", maxWidth: "450px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
            <h3 style={{ marginTop: 0, color: "#0f172a", fontSize: "20px" }}>Review Distributor</h3>
            <p style={{ color: "#64748b", fontSize: "14px", marginTop: "-10px", marginBottom: "20px" }}>{reviewModal.targetName}</p>
            
            <form onSubmit={handleReviewSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <label style={{ fontSize: "14px", fontWeight: "600", color: "#334155" }}>
                Rating (1-5):
                <input 
                  type="number" min="1" max="5" required 
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm({...reviewForm, rating: e.target.value})}
                  style={{ width: "100%", padding: "10px", marginTop: "6px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                />
              </label>
              
              <label style={{ fontSize: "14px", fontWeight: "600", color: "#334155" }}>
                Your Experience:
                <textarea 
                  rows="4" required placeholder="How was the delivery and quality?"
                  value={reviewForm.reviewText}
                  onChange={(e) => setReviewForm({...reviewForm, reviewText: e.target.value})}
                  style={{ width: "100%", padding: "10px", marginTop: "6px", borderRadius: "8px", border: "1px solid #cbd5e1", resize: "none" }}
                />
              </label>
              
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "12px" }}>
                <button type="button" onClick={() => setReviewModal({isOpen: false, targetId: null, targetName: ""})} style={{ padding: "10px 20px", cursor: "pointer", background: "#f1f5f9", border: "none", borderRadius: "6px", fontWeight: "600" }}>Cancel</button>
                <button type="submit" style={{ padding: "10px 20px", background: "#2563eb", color: "white", border: "none", cursor: "pointer", borderRadius: "6px", fontWeight: "600" }}>Submit Review</button>

              </div>
            </form>
          </div>
        </div>
      )}
      {/* --- REJECT ORDER MODAL --- */}
{rejectModal.isOpen && (
  <div className="reject-modal-overlay">
    <div className="reject-modal">
      <h3>Reject Customer Order</h3>

      <p>
        Please select the reason for rejecting this order.
      </p>

      <form onSubmit={handleRejectSubmit}>
        <label>
          Rejection Reason
        </label>

        <select
          value={rejectionReason}
          onChange={(e) => {
            setRejectionReason(e.target.value);
            setCustomRejectionReason("");
          }}
          required
        >
          <option value="">
            Select rejection reason
          </option>

          <option value="Prescription में लिखी medicine उपलब्ध नहीं है।">
            Prescription medicine is not available.
          </option>

          <option value="Original prescription और ordered medicine में अंतर है।">
            Ordered medicine does not match prescription.
          </option>

          <option value="Prescription की writing स्पष्ट नहीं है।">
            Prescription writing is unclear.
          </option>

          <option value="Prescription की validity को लेकर समस्या है।">
            Prescription validity issue.
          </option>

          <option value="Doctor की prescription में यह medicine नहीं लिखी गई है।">
            Medicine is not written on doctor's prescription.
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        {rejectionReason === "Other" && (
          <textarea
            rows="4"
            maxLength="500"
            placeholder="Enter rejection reason..."
            value={customRejectionReason}
            onChange={(e) =>
              setCustomRejectionReason(e.target.value)
            }
            required
          />
        )}

        <div className="reject-modal-actions">
          <button
            type="button"
            className="cancel-reject-btn"
            disabled={actionLoading}
            onClick={() => {
              setRejectModal({
                isOpen: false,
                orderId: null,
              });

              setRejectionReason("");
              setCustomRejectionReason("");
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="confirm-reject-btn"
            disabled={actionLoading}
          >
            {actionLoading ? "Processing..." : "Confirm Reject"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default ShopkeeperOrder;
