import "./Dashboard.css";
import Card from "../../../components/Card/Card";

const Dashboard = () => {
  return (
    <div className="dashboard">

      <div className="dashboard-title">
        <h1>Dashboard</h1>
        <p>Welcome Back, Admin 👋</p>
      </div>

      <div className="dashboard-cards">

        <Card
          title="Total Users"
          value="12,540"
          color="#2563eb"
        />

        <Card
          title="Shopkeepers"
          value="2,350"
          color="#16a34a"
        />

        <Card
          title="Distributors"
          value="425"
          color="#f59e0b"
        />

        <Card
          title="Medicines"
          value="8,950"
          color="#ef4444"
        />

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