import "./Orders.css";

const orders = [
  {
    id: "#1001",
    customer: "Anoop Tripathi",
    shopkeeper: "Anoop Medical Store",
    amount: "₹1,250",
    status: "Delivered",
    date: "01-07-2026",
  },
  {
    id: "#1002",
    customer: "Rahul Sharma",
    shopkeeper: "Shiv Medical",
    amount: "₹860",
    status: "Pending",
    date: "01-07-2026",
  },
  {
    id: "#1003",
    customer: "Priya Singh",
    shopkeeper: "Life Care Pharmacy",
    amount: "₹2,450",
    status: "Cancelled",
    date: "30-06-2026",
  },
];

const Orders = () => {
  return (
    <div className="orders-page">

      <div className="orders-header">
        <h2>Orders Management</h2>

        <button className="export-btn">
          Export Orders
        </button>
      </div>

      <div className="search-filter">

        <input
          type="text"
          placeholder="Search Order..."
        />

        <select>
          <option>All Status</option>
          <option>Pending</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

      </div>

      <div className="orders-table">

        <table>

          <thead>

            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Shopkeeper</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order.id}>

                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.shopkeeper}</td>
                <td>{order.amount}</td>

                <td>

                  <span
                    className={
                      order.status === "Delivered"
                        ? "delivered"
                        : order.status === "Pending"
                        ? "pending"
                        : "cancelled"
                    }
                  >
                    {order.status}
                  </span>

                </td>

                <td>{order.date}</td>

                <td>

                  <button className="view-btn">
                    View
                  </button>

                  <button className="delete-btn">
                    Delete
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

export default Orders;