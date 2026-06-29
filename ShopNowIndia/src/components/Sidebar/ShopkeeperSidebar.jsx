import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { QRCodeCanvas } from "qrcode.react";
import "./ShopkeeperSidebar.css";

const ShopkeeperSidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);

  const shopId = user?.shopId || localStorage.getItem("shopId");
  const shopLink = shopId
    ? `${window.location.origin}/register?shopId=${shopId}`
    : "";

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className={`shopkeeper-sidebar ${isOpen ? "open" : ""}`}>
      <div className="shopkeeper-sidebar-header">
        <div>
          <img
            src="/omsanjeevani.png"
            alt="Retail Hub"
            className="shopkeeper-sidebar-logo"
          />
        </div>

        <button
          type="button"
          className="shopkeeper-sidebar-close"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>

      <div>
        <ul>
          <li>
            <NavLink to="/shopkeeper" end>
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/shopkeeper/medicine-list">
              Medicines Inventory
            </NavLink>
          </li>

          <li>
            <NavLink to="/shopkeeper/cart">
              Cart
            </NavLink>
          </li>

          <li>
            <NavLink to="/shopkeeper/orders">
              Orders
            </NavLink>
          </li>

          <li>
            <NavLink to="/shopkeeper/earnings">
              Earnings
            </NavLink>
          </li>

          <li>
            <NavLink to="/shopkeeper/profile">
              Profile
            </NavLink>
          </li>

          <li>
            <NavLink to="/shopkeeper/settings">
              Settings
            </NavLink>
          </li>

          {/* <li>
            <NavLink to="/shopkeeper/low-stock">
              Low Stock
            </NavLink>
          </li>

          <li>
            <NavLink to="/shopkeeper/expiring">
              Expiry Alert
            </NavLink>
          </li> */}
        </ul>
      </div>

      <div style={{ padding: "0 14px", marginTop: "15px" }}>
        {shopId && (
          <div className="shop-id-section">
            <p className="shop-id-label">STORE FRONT ID</p>

            <code className="shop-id-code">
              {shopId}
            </code>

            <button
              onClick={() => setShowQR(true)}
              className="qr-btn"
            >
              📷 Open Store QR
            </button>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Sign Out
        </button>
      </div>

      {showQR && (
        <div
          className="qr-modal-overlay"
          onClick={() => setShowQR(false)}
        >
          <div
            className="qr-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Store Front QR Code</h3>

            <p>
              Scan to register or look up medications linked
              to your shop.
            </p>

            <div className="qr-code-container">
              <QRCodeCanvas
                value={shopLink}
                size={200}
              />
            </div>

            <button
              onClick={() => setShowQR(false)}
              className="qr-close-btn"
            >
              Minimize Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopkeeperSidebar;