import { useEffect, useState } from "react";
import "./Report.css";
import {
  getDashboardReport,
  getSalesReport,
  downloadSalesReport,
} from "../../../services/api";

const defaultDashboard = {
  revenue: {
    today: 0,
    month: 0,
    total: 0,
  },
  orders: {
    total: 0,
    pending: 0,
    approved: 0,
    delivered: 0,
  },
  users: {
    customers: 0,
    shopkeepers: 0,
    distributors: 0,
  },
  medicines: {
    total: 0,
    lowStock: 0,
    outOfStock: 0,
    expiringSoon: 0,
    expired: 0,
  },
  coupons: {
    total: 0,
  },
};

const Report = () => {
  const [dashboard, setDashboard] = useState(defaultDashboard);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReports = async () => {
    try {
      setLoading(true);

      const [dashboardRes, salesRes] = await Promise.all([
        getDashboardReport(),
        getSalesReport(),
      ]);

      console.log("Dashboard Response:", dashboardRes);
      console.log("Sales Response:", salesRes);

      if (dashboardRes?.success && dashboardRes?.data) {
        setDashboard({
          ...defaultDashboard,
          ...dashboardRes.data,
          revenue: {
            ...defaultDashboard.revenue,
            ...(dashboardRes.data.revenue || {}),
          },
          orders: {
            ...defaultDashboard.orders,
            ...(dashboardRes.data.orders || {}),
          },
          users: {
            ...defaultDashboard.users,
            ...(dashboardRes.data.users || {}),
          },
          medicines: {
            ...defaultDashboard.medicines,
            ...(dashboardRes.data.medicines || {}),
          },
          coupons: {
            ...defaultDashboard.coupons,
            ...(dashboardRes.data.coupons || {}),
          },
        });
      }

      if (salesRes?.success && Array.isArray(salesRes.data)) {
        setSales(salesRes.data);
      } else {
        setSales([]);
      }
    } catch (err) {
      console.error("Report Error:", err);
      alert("Failed to load reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  if (loading) {
    return (
      <div className="report-page">
        <h2>Loading Reports...</h2>
      </div>
    );
  }

  const cards = [
    {
      title: "Today's Sales",
      value: `₹${dashboard.revenue.today.toLocaleString("en-IN")}`,
      color: "#16a34a",
    },
    {
      title: "Monthly Revenue",
      value: `₹${dashboard.revenue.month.toLocaleString("en-IN")}`,
      color: "#2563eb",
    },
    {
      title: "Total Revenue",
      value: `₹${dashboard.revenue.total.toLocaleString("en-IN")}`,
      color: "#7c3aed",
    },
    {
      title: "Total Orders",
      value: dashboard.orders.total,
      color: "#f59e0b",
    },
    {
      title: "Pending Orders",
      value: dashboard.orders.pending,
      color: "#ef4444",
    },
    {
      title: "Approved Orders",
      value: dashboard.orders.approved,
      color: "#3b82f6",
    },
    {
      title: "Delivered Orders",
      value: dashboard.orders.delivered,
      color: "#10b981",
    },
    {
      title: "Customers",
      value: dashboard.users.customers,
      color: "#06b6d4",
    },
    {
      title: "Shopkeepers",
      value: dashboard.users.shopkeepers,
      color: "#9333ea",
    },
    {
      title: "Distributors",
      value: dashboard.users.distributors,
      color: "#f97316",
    },
    {
      title: "Medicines",
      value: dashboard.medicines.total,
      color: "#14b8a6",
    },
    {
      title: "Coupons",
      value: dashboard.coupons.total,
      color: "#e11d48",
    },
  ];

  return (
    <div className="report-page">
      <div className="report-header">
        <h2>Reports Dashboard</h2>

        <button
          className="download-btn"
          onClick={downloadSalesReport}
        >
          Download CSV
        </button>
      </div>

      <div className="report-cards">
        {cards.map((card, index) => (
          <div
            key={index}
            className="report-card"
            style={{
              borderTop: `5px solid ${card.color}`,
            }}
          >
            <h3>{card.title}</h3>
            <h1>{card.value}</h1>
          </div>
        ))}
      </div>

      <div className="report-table">
        <h3>Sales Summary</h3>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Orders</th>
              <th>Revenue</th>
              <th>Discount</th>
              <th>Net Revenue</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Sales Found
                </td>
              </tr>
            ) : (
              sales.map((sale, index) => (
                <tr key={index}>
                  <td>{sale.date}</td>

                  <td>{sale.orders}</td>

                  <td>
                    ₹{Number(sale.revenue || 0).toLocaleString("en-IN")}
                  </td>

                  <td>
                    ₹{Number(sale.discount || 0).toLocaleString("en-IN")}
                  </td>

                  <td>
                    ₹{Number(sale.netRevenue || 0).toLocaleString("en-IN")}
                  </td>

                  <td>
                    <span className="success">
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="report-cards">
        <div className="report-card">
          <h3>Low Stock</h3>
          <h1>{dashboard.medicines.lowStock}</h1>
        </div>

        <div className="report-card">
          <h3>Out Of Stock</h3>
          <h1>{dashboard.medicines.outOfStock}</h1>
        </div>

        <div className="report-card">
          <h3>Expiring Soon</h3>
          <h1>{dashboard.medicines.expiringSoon}</h1>
        </div>

        <div className="report-card">
          <h3>Expired Medicines</h3>
          <h1>{dashboard.medicines.expired}</h1>
        </div>
      </div>
    </div>
  );
};

export default Report;