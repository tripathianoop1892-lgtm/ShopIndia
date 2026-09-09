import "./Dashboard.css";
import { useState, useEffect } from "react";

import {
  asList,
  getAdminOrders,
  getDashboardReport,
  getMedicine,
} from "../../../services/api";


const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    shopkeepers: 0,
    distributors: 0,
    medicines: 0,
  });
  const [orders, setOrders] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminStats = async () => {
      setLoading(true);
      setError("");
      try {
        const [reportResponse, ordersResponse, medicinesResponse] = await Promise.all([
          getDashboardReport(), getAdminOrders(), getMedicine(),
        ]);
        if (!reportResponse?.success) throw new Error(reportResponse?.message || "Unable to load dashboard data.");
        const report = reportResponse.data || {};
        setStats({
          users: Number(report.users?.customers || 0),
          shopkeepers: Number(report.users?.shopkeepers || 0),
          distributors: Number(report.users?.distributors || 0),
          medicines: Number(report.medicines?.total || 0),
        });
        setOrders(asList(ordersResponse, ["orders"]).slice(0, 5));
        setLowStockItems(asList(medicinesResponse, ["medicines"]).filter((medicine) => Number(medicine.stock || 0) <= 10).slice(0, 5));
      } catch (error) {
        console.error("Admin Dashboard Stats Error:", error);
        setError(error.message || "Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);
  return (

    <div className="dashboard">

      <div className="dashboard-title">
        <h1>Dashboard</h1>
        <p>Welcome Back, Admin 👋</p>
      </div>
      {error && <p className="admin-data-error" role="alert">{error}</p>}
      <div className="dashboard-cards">

  <div className="admin-stat-card users-card">
    <div className="admin-stat-icon">👥</div>
    <div className="admin-stat-info">
      <p>Total Users</p>
      <h2>{stats.users.toLocaleString()}</h2>
    </div>
  </div>

  <div className="admin-stat-card shopkeepers-card">
    <div className="admin-stat-icon">🏪</div>
    <div className="admin-stat-info">
      <p>Shopkeepers</p>
      <h2>{stats.shopkeepers.toLocaleString()}</h2>
    </div>
  </div>

  <div className="admin-stat-card distributors-card">
    <div className="admin-stat-icon">🚚</div>
    <div className="admin-stat-info">
      <p>Distributors</p>
      <h2>{stats.distributors.toLocaleString()}</h2>
    </div>
  </div>

  <div className="admin-stat-card medicines-card">
    <div className="admin-stat-icon">💊</div>
    <div className="admin-stat-info">
      <p>Medicines</p>
      <h2>{stats.medicines.toLocaleString()}</h2>
    </div>
  </div>

</div>

      <div className="dashboard-row">

        <div className="dashboard-box">

          <h2>Recent Orders</h2>

          <div className="admin-dashboard-table-scroll"><table>

            <thead>

              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {loading && <tr><td colSpan="3">Loading recent orders...</td></tr>}
              {!loading && orders.map((order) => <tr key={order._id}><td>#{String(order._id).slice(-8)}</td><td>{order.customerName || order.shopkeeperName || "—"}</td><td className={String(order.status || "").toLowerCase()}>{order.status || "Pending"}</td></tr>)}
              {!loading && !orders.length && <tr><td colSpan="3">No orders found.</td></tr>}

            </tbody>

          </table></div>

        </div>

        <div className="dashboard-box">

          <h2>Low Stock Alert</h2>

          <ul>

            {loading && <li>Loading stock alerts...</li>}
            {!loading && lowStockItems.map((medicine) => <li key={medicine._id}>{medicine.name} - {medicine.stock || 0} left</li>)}
            {!loading && !lowStockItems.length && <li>No low-stock medicines.</li>}

          </ul>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
