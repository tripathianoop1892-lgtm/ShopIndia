import "./Payments.css";

const payments = [
  {
    id: "TXN1001",
    customer: "Anoop Tripathi",
    amount: "₹1,250",
    method: "UPI",
    status: "Success",
    date: "01-07-2026",
  },
  {
    id: "TXN1002",
    customer: "Rahul Sharma",
    amount: "₹850",
    method: "Card",
    status: "Pending",
    date: "01-07-2026",
  },
  {
    id: "TXN1003",
    customer: "Priya Singh",
    amount: "₹2,400",
    method: "Net Banking",
    status: "Failed",
    date: "30-06-2026",
  },
];

const Payments = () => {
  return (
    <div className="payments-page">

      <div className="payments-header">
        <h2>Payments</h2>

        <button className="export-btn">
          Export Report
        </button>
      </div>

      <div className="search-filter">

        <input
          type="text"
          placeholder="Search Transaction..."
        />

        <select>
          <option>All Status</option>
          <option>Success</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>

      </div>

      <div className="payments-table">

        <table>

          <thead>

            <tr>
              <th>Transaction ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {payments.map((payment) => (

              <tr key={payment.id}>

                <td>{payment.id}</td>
                <td>{payment.customer}</td>
                <td>{payment.amount}</td>
                <td>{payment.method}</td>

                <td>

                  <span
                    className={
                      payment.status === "Success"
                        ? "success"
                        : payment.status === "Pending"
                        ? "pending"
                        : "failed"
                    }
                  >
                    {payment.status}
                  </span>

                </td>

                <td>{payment.date}</td>

                <td>

                  <button className="view-btn">
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Payments;