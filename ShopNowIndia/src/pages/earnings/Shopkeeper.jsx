import React, { useEffect, useState, useMemo } from "react";
import { getOrders } from "../../services/api";
import { FaRupeeSign, FaArrowAltCircleUp, FaArrowAltCircleDown, FaWallet, FaSpinner, FaExchangeAlt, FaBuilding, FaUserCheck } from "react-icons/fa";
import { exportRowsToExcel } from "../../utils/export";
import "./Shopkeeper.css";

const ShopkeeperEarnings = () => {
  const [b2cSales, setB2cSales] = useState([]);
  const [b2bPurchases, setB2bPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompleteCashFlow();
  }, []);

  const fetchCompleteCashFlow = async () => {
    try {
      setLoading(true);
      const [salesData, purchaseData] = await Promise.all([
        getOrders("b2c-retail"),
        getOrders("b2b-purchases")
      ]);

      setB2cSales(Array.isArray(salesData) ? salesData : []);
      setB2bPurchases(Array.isArray(purchaseData) ? purchaseData : []);
    } catch (err) {
      console.error("Error compilation across compound financial arrays:", err);
    } finally {
      setLoading(false);
    }
  };

  // 📊 COMPREHENSIVE CASH FLOW COMPILATION ENGINE
  const cashFlowMetrics = useMemo(() => {
    // 1. Inflow calculations (Settled Customer Orders)
    const settledSales = b2cSales.filter(o => ["Paid", "Approved", "Delivered"].includes(o.status));
    const totalInflow = settledSales.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    // 2. Outflow calculations (Settled Distributor Purchases)
    const settledPurchases = b2bPurchases.filter(o => ["Paid", "Approved", "Delivered"].includes(o.status));
    const totalOutflow = settledPurchases.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    // 3. Absolute Net Metrics
    const netCashBalance = totalInflow - totalOutflow;
    const profitMarginPercentage = totalInflow > 0 ? ((netCashBalance / totalInflow) * 100).toFixed(1) : "0.0";

    // 4. Combined Chronological Unified Transaction Array for Ledger Output
    const combinedLedger = [
      ...b2cSales.map(o => ({ 
        ...o, 
        type: "INFLOW", 
        entityName: o.customerName || "Walk-In Customer" 
      })),
      ...b2bPurchases.map(o => ({ 
        ...o, 
        type: "OUTFLOW", 
        // 🛡️ CRITICAL FIX: Extract the distributor's real populated company profile name
        entityName: o.sellerId?.name || o.company || "Wholesale Distributor" 
      }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return {
      inflow: totalInflow,
      outflow: totalOutflow,
      net: netCashBalance,
      margin: profitMarginPercentage,
      ledger: combinedLedger,
      salesCount: settledSales.length,
      purchaseCount: settledPurchases.length
    };
  }, [b2cSales, b2bPurchases]);

  if (loading) {
    return (
      <div className="earnings-loading-wrapper">
        <FaSpinner className="spinner-icon" />
        <h3>Balancing Multi-Channel Corporate Cash Books...</h3>
        <p>Analyzing compound B2B and B2C automated ledger registries</p>
      </div>
    );
  }

  const exportEarnings = () => exportRowsToExcel("shopkeeper-earnings", cashFlowMetrics.ledger.map((tx) => ({
    "Transaction ID": tx._id,
    Type: tx.type,
    Counterparty: tx.entityName,
    Status: tx.status,
    Date: new Date(tx.createdAt).toLocaleDateString("en-IN"),
    Amount: tx.type === "INFLOW" ? Number(tx.finalAmount ?? tx.totalAmount ?? 0) : -Number(tx.finalAmount ?? tx.totalAmount ?? 0),
  })));

  return (
    <div className="shopkeeper-earnings-container">
      {/* HEADER SECTION */}
      <div className="earnings-dashboard-header">
        <div>
          <h2>💼 Consolidated Cash Flow Dashboard</h2>
          <p>Real-time corporate capital auditing bridging distributor procurement and consumer sales pipelines.</p>
        </div>
        <div className="earnings-header-actions">
          <button className="earnings-export-btn" onClick={exportEarnings}>Export Excel</button>
          <div className="realtime-status-pill"><span className="pulse-dot"></span> Ledger Balanced</div>
        </div>
      </div>

      {/* THREE-COLUMN COMPREHENSIVE LIQUIDITY SHIELDS */}
      <div className="financial-stats-grid">
        <div className="financial-stat-card cash-inflow-card">
          <div className="stat-card-inner-flex">
            <div>
              <p className="card-sub-label">Total Cash Inflow (B2C)</p>
              <h3 className="amount-positive">₹{cashFlowMetrics.inflow.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
            </div>
            <div className="stat-icon-shield text-green">
              <FaArrowAltCircleUp />
            </div>
          </div>
          <div className="card-footer-metric">{cashFlowMetrics.salesCount} Settled Consumer Sales Receipts</div>
        </div>

        <div className="financial-stat-card cash-outflow-card">
          <div className="stat-card-inner-flex">
            <div>
              <p className="card-sub-label">Total Cash Outflow (B2B)</p>
              <h3 className="amount-negative">₹{cashFlowMetrics.outflow.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
            </div>
            <div className="stat-icon-shield text-red">
              <FaArrowAltCircleDown />
            </div>
          </div>
          <div className="card-footer-metric">{cashFlowMetrics.purchaseCount} Procurement Supply Deliveries Settled</div>
        </div>

        <div className="financial-stat-card net-balance-card" style={{ borderLeftColor: cashFlowMetrics.net >= 0 ? "#10b981" : "#ef4444" }}>
          <div className="stat-card-inner-flex">
            <div>
              <p className="card-sub-label">Net Liquidity Position</p>
              <h3 style={{ color: cashFlowMetrics.net >= 0 ? "#16a34a" : "#dc2626" }}>
                ₹{cashFlowMetrics.net.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </h3>
            </div>
            <div className="stat-icon-shield text-purple">
              <FaWallet />
            </div>
          </div>
          <div className="card-footer-metric">Operational Performance Margin: {cashFlowMetrics.margin}%</div>
        </div>
      </div>

      {/* DYNAMIC PROGRESS CASH BREAKDOWN RATIO BAR */}
      <div className="cashflow-ratio-bar-wrapper">
        <div className="ratio-labels">
          <span>Inflow Ratio (Sales Value)</span>
          <span>Outflow Ratio (Supply Investment)</span>
        </div>
        <div className="ratio-bar-track">
          <div 
            className="ratio-fill-inflow" 
            style={{ width: `${Math.max(10, Math.min(90, (cashFlowMetrics.inflow / (cashFlowMetrics.inflow + cashFlowMetrics.outflow || 1)) * 100))}%` }}
          ></div>
        </div>
      </div>

      {/* INTEGRATED MASTER STATEMENT LEDGER JOURNAL */}
      <div className="history-ledger-section-block">
        <div className="ledger-block-header">
          <div className="title-row-flex">
            <FaExchangeAlt className="section-title-icon" />
            <div>
              <h3>Unified Account Statement & Journal Ledger</h3>
              <p>Combined real-time statement auditing transactions intersecting wholesale procurement and retail customer fulfillment rows.</p>
            </div>
          </div>
        </div>

        {cashFlowMetrics.ledger.length === 0 ? (
          <div className="empty-ledger-state">
            <div className="empty-illustration">📊</div>
            <h4>Account Statement Blank</h4>
            <p>No systemic operational transactions have been processed by this marketplace account yet.</p>
          </div>
        ) : (
          <div className="ledger-table-overflow-box">
            <table className="professional-ledger-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Counterparty Context</th>
                  <th>Statement Type</th>
                  <th>Date Execution</th>
                  <th className="text-center">Pipeline State</th>
                  <th className="text-right">Transaction Value</th>
                </tr>
              </thead>
              <tbody>
                {cashFlowMetrics.ledger.map((tx) => (
                  <tr key={tx._id} className="ledger-interactive-row">
                    <td className="monospace-cell-id">#{tx._id.slice(-8).toUpperCase()}</td>
                    <td>
                      <div className="customer-meta-cell">
                        <span className="customer-primary-name">{tx.entityName}</span>
                        <span className="customer-secondary-subtext">
                          {tx.type === "INFLOW" ? <><FaUserCheck style={{ marginRight: "4px" }} /> B2C Consumer Asset</> : <><FaBuilding style={{ marginRight: "4px" }} /> B2B Wholesaler Supply</>}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`transaction-type-indicator-pill ${tx.type.toLowerCase()}`}>
                        {tx.type === "INFLOW" ? "Credit / Inflow" : "Debit / Outflow"}
                      </span>
                    </td>
                    <td className="date-time-cell">
                      {new Date(tx.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </td>
                    <td className="text-center">
                      <span className={`badge-status ${tx.status?.toLowerCase() === "approved" || tx.status?.toLowerCase() === "delivered" ? "settled" : tx.status?.toLowerCase() === "pending" ? "pending" : "cancelled"}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className={`text-right table-bold-amount ${tx.type === "INFLOW" ? "credit-color" : "debit-color"}`}>
                      {tx.type === "INFLOW" ? "+" : "-"} ₹{Number(tx.totalAmount || tx.total || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
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

export default ShopkeeperEarnings;
