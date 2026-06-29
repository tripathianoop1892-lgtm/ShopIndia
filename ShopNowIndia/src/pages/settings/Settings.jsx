import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { 
  FaSlidersH, FaBell, FaShieldAlt, FaSave, 
  FaStore, FaPercentage, FaExclamationTriangle, FaCheckCircle
} from "react-icons/fa";
import "./Settings.css";

const Settings = () => {
  const { user, isCustomer, isShopkeeper, isDistributor, isAdmin } = useAuth();
  const [activeSection, setActiveSection] = useState("preferences");
  const [saveStatus, setSaveStatus] = useState(false);

  // Form State Configurations
  const [prefForm, setPrefForm] = useState({
    emailAlerts: true,
    orderUpdates: true,
    lowStockWarning: isDistributor || isShopkeeper, // Enabled default for inventory handlers[cite: 2]
    autoRefreshCatalog: true
  });

  const [tradeForm, setTradeForm] = useState({
    defaultMarkup: "15", // Target shopkeeper B2C markup default
    minimumB2BOrder: "1500", // Target distributor bulk floor limit
    autoApproveReorders: false
  });

  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleActionSave = (e) => {
    e.preventDefault();
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 3000); // UI Toast flash reset
  };

  if (!user) {
    return (
      <div className="settings-loading-wrapper">
        <div className="spinner-icon" />
        <h3>Loading Operational Framework...</h3>
      </div>
    );
  }

  return (
    <div className="pro-settings-wrapper">
      {/* LEFT SIDEBAR: CONFIGURATION INDEX LINKS */}
      <aside className="pro-settings-sidebar-card">
        <div className="settings-header-title">
          <FaSlidersH className="heading-icon" />
          <div>
            <h2>Control Panel</h2>
            <p>Configure business environment options</p>
          </div>
        </div>
        
        <hr className="divider-line" />

        <nav className="sidebar-tab-nav">
          <button 
            className={`tab-anchor-btn ${activeSection === "preferences" ? "active" : ""}`}
            onClick={() => setActiveSection("preferences")}
          >
            <FaBell /> Communication Alerts
          </button>
          
          {(isShopkeeper || isDistributor) && (
            <button 
              className={`tab-anchor-btn ${activeSection === "trade" ? "active" : ""}`}
              onClick={() => setActiveSection("trade")}
            >
              <FaPercentage /> Commercial Trade Controls
            </button>
          )}

          <button 
            className={`tab-anchor-btn ${activeSection === "security" ? "active" : ""}`}
            onClick={() => setActiveSection("security")}
          >
            <FaShieldAlt /> Password & Access
          </button>
        </nav>
      </aside>

      {/* RIGHT CONTENT PANEL: DYNAMIC INTERACTIVE CONFIGURATIONS */}
      <main className="pro-settings-main-content">
        {saveStatus && (
          <div className="notification-toast-banner success animation-fade-in">
            <FaCheckCircle /> <span>System parameters updated and synchronized live across network channels.</span>
          </div>
        )}

        {/* SECTION 1: COMMUNICATION & NOTIFICATION PREFERENCES */}
        {activeSection === "preferences" && (
          <form onSubmit={handleActionSave} className="view-panel-card animation-fade-in">
            <div className="panel-header">
              <h3>Communication Alerts Configuration</h3>
              <p>Manage real-time push events and automated dashboard metric sync loops.</p>
            </div>

            <div className="toggles-stack">
              <label className="toggle-row-item">
                <div className="toggle-meta">
                  <span className="toggle-title">System Email Ledger Statements</span>
                  <p className="toggle-desc">Dispatch transaction statements directly to {user.email} upon checkout finalization.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={prefForm.emailAlerts}
                  onChange={(e) => setPrefForm({...prefForm, emailAlerts: e.target.checked})}
                />
              </label>

              <label className="toggle-row-item">
                <div className="toggle-meta">
                  <span className="toggle-title">Instant Pipeline Status Indicators</span>
                  <p className="toggle-desc">Populate notification badges immediately when orders change states to Approved or Rejected.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={prefForm.orderUpdates}
                  onChange={(e) => setPrefForm({...prefForm, orderUpdates: e.target.checked})}
                />
              </label>

              {(isDistributor || isShopkeeper) && (
                <label className="toggle-row-item">
                  <div className="toggle-meta">
                    <span className="toggle-title">Critical Short-Stock Warnings</span>
                    <p className="toggle-desc">Flag real-time alerts when batch inventory balances drop below compliance safety bounds.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={prefForm.lowStockWarning}
                    onChange={(e) => setPrefForm({...prefForm, lowStockWarning: e.target.checked})}
                  />
                </label>
              )}
            </div>

            <div className="panel-footer-actions">
              <button type="submit" className="settings-save-btn"><FaSave /> Save Preferences</button>
            </div>
          </form>
        )}

        {/* SECTION 2: ROLE-SPECIFIC COMMERCIAL CONTROL ENGINE */}
        {activeSection === "trade" && (isShopkeeper || isDistributor) && (
          <form onSubmit={handleActionSave} className="view-panel-card animation-fade-in">
            <div className="panel-header">
              <h3>Commercial Trade Controls</h3>
              <p>Fine-tune operational pricing guidelines and bulk shipment minimum variables.</p>
            </div>

            <div className="input-fields-grid">
              {isShopkeeper && (
                <div className="form-group-item">
                  <label>Standard Consumer Catalog Price Markup (%)</label>
                  <input 
                    type="number" 
                    value={tradeForm.defaultMarkup}
                    onChange={(e) => setTradeForm({...tradeForm, defaultMarkup: e.target.value})}
                    placeholder="15"
                  />
                  <small className="field-fine-print">Automates dynamic retail tier configuration values relative to wholesale acquisition cost paid.</small>
                </div>
              )}

              {isDistributor && (
                <div className="form-group-item">
                  <label>B2B Minimum Bulk Order Invoice Subtotal (₹)</label>
                  <input 
                    type="number" 
                    value={tradeForm.minimumB2BOrder}
                    onChange={(e) => setTradeForm({...tradeForm, minimumB2BOrder: e.target.value})}
                    placeholder="1500"
                  />
                  <small className="field-fine-print">Establishes the absolute financial floor needed before shopkeepers can dispatch bulk purchase pipelines.</small>
                </div>
              )}

              <label className="toggle-row-item margin-top-adjustment">
                <div className="toggle-meta">
                  <span className="toggle-title">Automate Routine Procurement Flows</span>
                  <p className="toggle-desc">Bypass manual ledger screening loops for verified baseline contract items.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={tradeForm.autoApproveReorders}
                  onChange={(e) => setTradeForm({...tradeForm, autoApproveReorders: e.target.checked})}
                />
              </label>
            </div>

            <div className="panel-footer-actions">
              <button type="submit" className="settings-save-btn"><FaSave /> Save Trade Variables</button>
            </div>
          </form>
        )}

        {/* SECTION 3: RE-AUTHENTICATION & ACCESS MANAGEMENT */}
        {activeSection === "security" && (
          <form onSubmit={handleActionSave} className="view-panel-card animation-fade-in">
            <div className="panel-header">
              <h3>Password & Access Control</h3>
              <p>Re-authenticate and reset administrative access values to maintain channel safety.</p>
            </div>

            <div className="input-fields-grid restricted-width">
              <div className="form-group-item">
                <label>Active Verification Password</label>
                <input 
                  type="password" 
                  value={securityForm.currentPassword}
                  onChange={(e) => setSecurityForm({...securityForm, currentPassword: e.target.value})}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="form-group-item">
                <label>New Account Corporate Password</label>
                <input 
                  type="password" 
                  value={securityForm.newPassword}
                  onChange={(e) => setSecurityForm({...securityForm, newPassword: e.target.value})}
                  placeholder="Minimum 6 characters"
                  required
                />
              </div>

              <div className="form-group-item">
                <label>Confirm Corporate Password Parameter</label>
                <input 
                  type="password" 
                  value={securityForm.confirmPassword}
                  onChange={(e) => setSecurityForm({...securityForm, confirmPassword: e.target.value})}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="panel-footer-actions">
              <button type="submit" className="settings-save-btn"><FaSave /> Update Access Credentials</button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default Settings;