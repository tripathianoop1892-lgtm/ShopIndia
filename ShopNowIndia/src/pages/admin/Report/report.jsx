import "./Report.css";

const reports = [
  {
    id: 1,
    title: "Today's Sales",
    value: "₹25,450",
    color: "#16a34a",
  },
  {
    id: 2,
    title: "Monthly Revenue",
    value: "₹8,45,320",
    color: "#2563eb",
  },
  {
    id: 3,
    title: "Total Orders",
    value: "1,245",
    color: "#f59e0b",
  },
  {
    id: 4,
    title: "Total Customers",
    value: "5,420",
    color: "#dc2626",
  },
];

const Report = () => {
  return (
    <div className="report-page">

      <div className="report-header">
        <h2>Reports</h2>

        <button className="download-btn">
          Download Report
        </button>
      </div>

      <div className="report-cards">

        {reports.map((report) => (
          <div
            className="report-card"
            key={report.id}
            style={{ borderTop: `5px solid ${report.color}` }}
          >
            <h3>{report.title}</h3>
            <h1>{report.value}</h1>
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
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            <tr>
              <td>01-07-2026</td>
              <td>125</td>
              <td>₹25,450</td>
              <td className="success">Completed</td>
            </tr>

            <tr>
              <td>30-06-2026</td>
              <td>108</td>
              <td>₹21,800</td>
              <td className="success">Completed</td>
            </tr>

            <tr>
              <td>29-06-2026</td>
              <td>95</td>
              <td>₹18,350</td>
              <td className="pending">Processing</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Report;