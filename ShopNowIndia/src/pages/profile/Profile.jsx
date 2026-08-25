import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { getMyReviews } from "../../services/api"; // Added API import
import { 
  FaUser, FaEnvelope, FaShieldAlt, FaStore, 
  FaStar, FaThList, FaSignOutAlt, FaIdBadge,
  FaBriefcase, FaBuilding, FaFileContract, FaRegHandshake
} from "react-icons/fa";
import "./Profile.css";

const Profile = () => {
  const { user, logout, isCustomer, isShopkeeper, isDistributor, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // --- My Reviews State ---
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    if (activeTab === "reviews" && (isShopkeeper || isDistributor)) {
      fetchReviews();
    }
  }, [activeTab, isShopkeeper, isDistributor]);

  const fetchReviews = async () => {
    try {
      const res = await getMyReviews();
      if (res.success) setMyReviews(res.data || []);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.clear();
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="profile-loading-wrapper">
        <div className="spinner-icon" />
        <h3>System Registry Missing</h3>
        <p>No active user session detected. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="pro-profile-wrapper">
      {/* LEFT COLUMN: BUSINESS SUMMARY CARD */}
      <aside className="pro-profile-sidebar-card">
        <div className="avatar-context-anchor">
          <div className={`avatar-frame ${user.role}`}>
            <FaBriefcase />
          </div>
          <div className="pulse-network-dot" title="Verified Business Node Active" />
        </div>
        
        <div className="sidebar-identity-meta">
          <h2>{user.name}</h2>
          <p className="sidebar-email-sub">{user.email}</p>
          <span className={`status-badge-pill ${user.role}`}>
            {user.role === "customer" ? "Retail Client" : user.role}
          </span>
        </div>

        <hr className="divider-line" />

        {/* NAVIGATION TAB PIPELINE */}
        <nav className="sidebar-tab-nav">
          <button 
            className={`tab-anchor-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <FaIdBadge /> Corporate Account Overview
          </button>
          <button 
            className={`tab-anchor-btn ${activeTab === "registry" ? "active" : ""}`}
            onClick={() => setActiveTab("registry")}
          >
            <FaBuilding /> Commercial Channel Scope
          </button>
          <button 
            className={`tab-anchor-btn ${activeTab === "compliance" ? "active" : ""}`}
            onClick={() => setActiveTab("compliance")}
          >
            <FaFileContract /> Terms & Compliance
          </button>

          {/* NEW: Reviews Tab for Sellers */}
          {(isShopkeeper || isDistributor) && (
            <button 
              className={`tab-anchor-btn ${activeTab === "reviews" ? "active" : ""}`} 
              onClick={() => setActiveTab("reviews")}
            >
              <FaStar /> My Business Reviews
            </button>
          )}
        </nav>

        <button onClick={handleLogout} className="sidebar-signout-action-btn">
          <FaSignOutAlt /> Close Secure Session
        </button>
      </aside>

      {/* RIGHT COLUMN: PROFESSIONAL BUSINESS VIEW PANEL */}
      <main className="pro-profile-main-content">
        
        {/* TAB 1: CORPORATE ACCOUNT OVERVIEW */}
        {activeTab === "overview" && (
          <section className="view-panel-card animation-fade-in">
            <div className="panel-header">
              <h3>Corporate Account Overview</h3>
              <p>Primary business identity records and credential parameters inside the OmSanjeevani Network.</p>
            </div>
            
            <div className="structured-data-grid">
              <div className="data-row-item">
                <span className="data-field-lbl">Official Entity Name</span>
                <span className="data-field-val">{user.name}</span>
              </div>
              <div className="data-row-item">
                <span className="data-field-lbl">Corporate Contact Email</span>
                <span className="data-field-val">{user.email}</span>
              </div>
              <div className="data-row-item">
                <span className="data-field-lbl">Marketplace Operations Account</span>
                <span className="data-field-val capitalization-rule">{user.role} Account</span>
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: COMMERCIAL CHANNEL SCOPE */}
        {activeTab === "registry" && (
          <section className="view-panel-card animation-fade-in">
            <div className="panel-header">
              <h3>Commercial Channel Scope</h3>
              <p>Dynamic operational scope mapping procurement tracks and target consumer volumes.</p>
            </div>

            {/* RETAIL CUSTOMER */}
            {isCustomer && (
              <div className="contextual-telemetry-block line-blue">
                <div className="telemetry-row">
                  <span className="telemetry-lbl"><FaStore /> Connected Retail Storefront ID</span>
                  <span className="telemetry-val string-box">{user.shopId || "Unassigned"}</span>
                </div>
                <div className="informational-callout-box">
                  <FaRegHandshake className="icon-success" />
                  <p>Your consumer profile is currently bound to this specific local pharmacy storefront for shopping line searches and localized price catalogs.</p>
                </div>
              </div>
            )}

            {/* PHARMACY SHOPKEEPER */}
            {isShopkeeper && (
              <div className="contextual-telemetry-block line-purple">
                <div className="telemetry-row">
                  <span className="telemetry-lbl"><FaStore /> Assigned Pharmacy Front ID</span>
                  <span className="telemetry-val string-box">{user.shopId}</span>
                </div>
                <div className="informational-callout-box">
                  <FaRegHandshake className="icon-success" />
                  <p>This verified business code authorizes your digital storefront node to accept retail orders from local consumers while managing bulk B2B procurement requests from logistics distributors.</p>
                </div>
              </div>
            )}

            {/* WHOLESALE DISTRIBUTOR */}
            {isDistributor && (
              <div className="contextual-telemetry-block line-green">
                <div className="telemetry-metrics-split-row">
                  <div className="metric-mini-shield">
                    <span className="metric-lbl"><FaStar /> Wholesale Service Rating</span>
                    <h4>{user.rating?.toFixed(1) || "4.8"} <span>/ 5.0 Rating</span></h4>
                  </div>
                  <div className="metric-mini-shield">
                    <span className="metric-lbl"><FaThList /> Fulfilled Supply Ledger Lines</span>
                    <h4>{user.reviewsCount || "24"} <span>Approved Orders</span></h4>
                  </div>
                </div>
                <div className="informational-callout-box">
                  <FaBriefcase className="icon-info" />
                  <p>These supply network performance metrics are shared live with registered pharmacy procurement managers seeking top-tier logistics partnerships.</p>
                </div>
              </div>
            )}

            {/* MASTER MARKETPLACE ADMIN */}
            {isAdmin && (
              <div className="contextual-telemetry-block line-red">
                <div className="telemetry-row">
                  <span className="telemetry-lbl"><FaShieldAlt /> Global Governance Clearance</span>
                  <span className="telemetry-val explicit-red-alert">MASTER ADMIN PRIVILEGES</span>
                </div>
                <div className="informational-callout-box warning-bg">
                  <FaShieldAlt className="icon-danger" />
                  <p>Your supervisor account controls marketplace balance checks, platform user audits, and systemic pricing verification sheets.</p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* TAB 3: NETWORK COMMERCIAL TERMS & COMPLIANCE */}
        {activeTab === "compliance" && (
          <section className="view-panel-card animation-fade-in">
            <div className="panel-header">
              <h3>Terms, Compliance & Safety Policy</h3>
              <p>Platform service level terms under which this business identity handles pharmaceutical supplies.</p>
            </div>

            <div className="structured-data-grid">
              <div className="data-row-item">
                <span className="data-field-lbl">Supply Chain Safety Enforcement</span>
                <span className="data-field-val security-fine-print">Automatic verification blocks prevent selling expired or batch-mismatched stock.</span>
              </div>
              <div className="data-row-item">
                <span className="data-field-lbl">Pricing Integrity Rules</span>
                <span className="data-field-val security-fine-print">System strict boundary guards ensure trade offers never exceed legal Maximum Retail Prices (MRP).</span>
              </div>
              <div className="data-row-item">
                <span className="data-field-lbl">Operational Accountability</span>
                <span className="data-field-val security-fine-print">All dispatched B2B bulk shipments capture fixed snapshot costs immediately at checkout to stabilize corporate financial ledgers.</span>
              </div>
            </div>
          </section>
        )}

        {/* NEW TAB 4: MY REVIEWS TAB */}
        {activeTab === "reviews" && (
          <section className="view-panel-card animation-fade-in">
            <div className="panel-header">
              <h3>My Business Reviews</h3>
              <p>Feedback and ratings submitted by your business partners and customers.</p>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {myReviews.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                  <FaStar style={{ fontSize: "32px", color: "#cbd5e1", marginBottom: "12px" }} />
                  <p>You have no reviews yet.</p>
                </div>
              ) : (
                myReviews.map((r) => (
                  <div key={r._id} style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <div>
                        <strong style={{ color: "#0f172a", fontSize: "15px" }}>
                          {r.reviewerId?.name || "Unknown User"}
                        </strong>
                        <span style={{ fontSize: "12px", color: "#64748b", marginLeft: "8px", textTransform: "uppercase", fontWeight: "600" }}>
                          ({r.reviewerId?.role || "User"})
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "#fef3c7", padding: "4px 10px", borderRadius: "20px", color: "#b45309", fontWeight: "700", fontSize: "13px" }}>
                        <FaStar /> {r.rating}.0
                      </div>
                    </div>
                    <p style={{ color: "#334155", margin: 0, fontSize: "14px", lineHeight: "1.5" }}>"{r.reviewText}"</p>
                    <small style={{ color: "#94a3b8", fontSize: "11px", display: "block", marginTop: "12px" }}>
                      {new Date(r.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

      </main>
    </div>
  );
};

export default Profile;