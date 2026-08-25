import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Note: Add this fetch call to your services/api.js 
    // export const getMyReviews = async () => { return await fetch(...).json() }
    const fetchReviews = async () => {
      const res = await fetch("http://localhost:5000/api/reviews/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      const data = await res.json();
      if (data.success) setReviews(data.data);
    };
    fetchReviews();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ fontSize: "24px", color: "#0f172a", marginBottom: "20px" }}>My Business Reviews</h2>
      <div style={{ display: "grid", gap: "16px" }}>
        {reviews.length === 0 ? <p>You have no reviews yet.</p> : reviews.map((r) => (
          <div key={r._id} style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <strong style={{ color: "#1e293b" }}>{r.reviewerId?.name} ({r.reviewerId?.role})</strong>
              <span style={{ color: "#f59e0b", fontWeight: "bold" }}>★ {r.rating}</span>
            </div>
            <p style={{ color: "#475569", margin: 0, fontSize: "14px" }}>{r.reviewText}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;