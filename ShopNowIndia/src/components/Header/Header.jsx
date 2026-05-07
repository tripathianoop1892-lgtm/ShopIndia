import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { QRCodeCanvas } from "qrcode.react";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [showQR, setShowQR] = useState(false);
  const [theme, setTheme] = useState("light");

  // 🔥 LOAD THEME
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  // 🌙 TOGGLE DARK MODE
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // 🚪 LOGOUT
  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/");
  };

  // 🔗 QR LINK
  const shopLink = user?.shopId
    ? `${window.location.origin}/?shopId=${user.shopId}`
    : "";

return (
  <div className="header">

    {/* LEFT */}
    <h3 className="logo">ShopNowIndia</h3>

    {/* RIGHT */}
    <div className="header-right">

      <span>{user?.email}</span>
      <span className="role">{user?.role}</span>

      {/* 🔥 QR BUTTON */}
      <button onClick={() => setShowQR(true)}>
        QR
      </button>

    </div>

    {/* 🔥 YAHI ADD KARNA HAI */}
    {showQR && (
      <div className="qr-modal">
        <div className="qr-box">

          <h3>Scan to Join Shop</h3>

          {/* 🔥 YEH LINE */}
          <QRCodeCanvas value={shopLink} size={200} />

          <p>{shopLink}</p>

          <button onClick={() => setShowQR(false)}>
            Close
          </button>

        </div>
      </div>
    )}

  </div>
);
};

export default Header;