import React, { useEffect, useState } from "react";
import "./Shopkeeper.css";
import { MedicinesList } from "../../services/api";

const ShopkeeperMedicineList = () => {
  const [retailStock, setRetailStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyStock();
  }, []);

  const fetchMyStock = async () => {
    try {
      setLoading(true);
      // Execute scoped fetch targeting exclusively items matching current shopId
      const data = await MedicinesList("?source=my-retail-stock");
      setRetailStock(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shopkeeper-container" style={{ padding: "20px" }}>
      <h2>📦 Local Shop Retail Inventory</h2>
      <p style={{ color: "#666" }}>These items are visible to consumers searching under your unique Shop ID token.</p>

      {loading ? (
        <p>Syncing retail data sheets...</p>
      ) : (
        <div style={{ marginTop: "20px", background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #cbd5e1" }}>
                <th style={{ padding: "12px" }}>Medicine Name</th>
                <th style={{ padding: "12px" }}>Company</th>
                <th style={{ padding: "12px" }}>Type</th>
                <th style={{ padding: "12px" }}>Current Stock Count</th>
                <th style={{ padding: "12px" }}>Wholesale Cost Paid</th>
                <th style={{ padding: "12px" }}>Retail Selling Price</th>
                <th style={{ padding: "12px" }}>Expiry Date Status</th>
              </tr>
            </thead>
            <tbody>
              {retailStock.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: "20px", textAlign: "center", color: "#94a3b8" }}>No inventory active. Place supply bulk requests to populate stock automatically.</td>
                </tr>
              ) : (
                retailStock.map(m => {
                  const isLow = m.stock <= 20;
                  const isExpired = new Date(m.expiry) < new Date();
                  
                  return (
                    <tr key={m._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px", fontWeight: "600" }}>{m.name}</td>
                      <td style={{ padding: "12px" }}>{m.company}</td>
                      <td style={{ padding: "12px" }}>{m.type}</td>
                      <td style={{ padding: "12px", color: isLow ? "#ef4444" : "inherit", fontWeight: isLow ? "bold" : "normal" }}>
                        {m.stock} {isLow && "⚠️ (Low Stock)"}
                      </td>
                      <td style={{ padding: "12px" }}>₹{m.wholesalePrice || 0}</td>
                      <td style={{ padding: "12px", color: "#16a34a", fontWeight: "bold" }}>₹{m.retailPrice || m.price}</td>
                      <td style={{ padding: "12px", color: isExpired ? "#ef4444" : "inherit" }}>
                        {new Date(m.expiry).toLocaleDateString()} {isExpired && "❌ (Expired)"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShopkeeperMedicineList;