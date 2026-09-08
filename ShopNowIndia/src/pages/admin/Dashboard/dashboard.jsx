import "./Dashboard.css";
import { useState, useEffect } from "react";

import {
  getCustomers,
  getShopkeeper,
  getDistributors,
  getMedicine,
} from "../../../services/api";


const Dashboard = () => {
    const [stats, setStats] = useState({
    users: 0,
    shopkeepers: 0,
    distributors: 0,
    medicines: 0,
  });

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const [
          usersData,
          shopkeepersData,
          distributorsData,
          medicinesData,
        ] = await Promise.all([
          getCustomers(),
          getShopkeeper(),
          getDistributors(),
          getMedicine(),
        ]);

        const getCount = (data, keys = []) => {
          if (Array.isArray(data)) {
            return data.length;
          }

          if (Array.isArray(data?.data)) {
            return data.data.length;
          }

          for (const key of keys) {
            if (Array.isArray(data?.[key])) {
              return data[key].length;
            }
          }

          return 0;
        };

        setStats({
          users: getCount(usersData, ["users"]),
          shopkeepers: getCount(shopkeepersData, ["shopkeepers"]),
          distributors: getCount(distributorsData, ["distributors"]),
          medicines: getCount(medicinesData, ["medicines"]),
        });
      } catch (error) {
        console.error("Admin Dashboard Stats Error:", error);
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

          <table>

            <thead>

              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              <tr>
                <td>#1025</td>
                <td>Anoop</td>
                <td className="success">Delivered</td>
              </tr>

              <tr>
                <td>#1026</td>
                <td>Rahul</td>
                <td className="pending">Pending</td>
              </tr>

              <tr>
                <td>#1027</td>
                <td>Priya</td>
                <td className="cancel">Cancelled</td>
              </tr>

            </tbody>

          </table>

        </div>

        <div className="dashboard-box">

          <h2>Low Stock Alert</h2>

          <ul>

            <li>Paracetamol - 10 Left</li>
            <li>Dolo 650 - 15 Left</li>
            <li>Vitamin C - 20 Left</li>
            <li>Insulin - 8 Left</li>

          </ul>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;