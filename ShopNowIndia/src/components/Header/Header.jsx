import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { QRCodeCanvas } from "qrcode.react";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showQR, setShowQR] = useState(false);

  const shopId = user?.shopId || localStorage.getItem("shopId");
  const shopLink = shopId ? `${window.location.origin}/register?shopId=${shopId}` : "";

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/");
  };

  return (
    /* Added class 'responsive-hub-header' here */
    <div className="responsive-hub-header header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1e293b", padding: "15px 25px", color: "white", borderRadius: "8px", marginBottom: "20px" }}>
      <div className="header-left">
        <h3 style={{ margin: 0 }}>OmSanjeevani Retail Hub 💊</h3>
      </div>
      
      <div className="header-right" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <span style={{ fontSize: "14px", opacity: 0.9 }}>{user?.email}</span>
        <span className="role" style={{ background: "#2563eb", padding: "4px 10px", borderRadius: "12px", fontSize: "12px", textTransform: "uppercase" }}>
          {user?.role}
        </span>

        {shopId && (
          <button 
            onClick={() => setShowQR(true)}
            style={{ padding: "6px 14px", background: "#10b981", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
          >
            📱 My QR
          </button>
        )}

        <button onClick={handleLogout} className="logout-btn" style={{ padding: "6px 14px", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Logout
        </button>
      </div>

      {/* QR MODAL WINDOW */}
      {showQR && (
        <div className="qr-modal" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 99999 }}>
          <div className="qr-box" style={{ background: "white", padding: "30px", borderRadius: "16px", textAlign: "center", color: "#1e293b", width: "320px" }}>
            <h3 style={{ marginBottom: "15px" }}>Store Front QR Code</h3>
            <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "15px" }}>Scan code to link directly with pharmacy store panels.</p>
            
            <div style={{ background: "#f8fafc", padding: "15px", borderRadius: "12px", display: "inline-block" }}>
              <QRCodeCanvas value={shopLink} size={200} />
            </div>

            <div style={{ marginTop: "15px", fontSize: "14px", background: "#f1f5f9", padding: "8px", borderRadius: "6px" }}>
              <strong>Shop ID:</strong> <code style={{ color: "#2563eb" }}>{shopId}</code>
            </div>

            <button 
              onClick={() => setShowQR(false)}
              style={{ marginTop: "20px", width: "100%", padding: "10px", background: "#64748b", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;