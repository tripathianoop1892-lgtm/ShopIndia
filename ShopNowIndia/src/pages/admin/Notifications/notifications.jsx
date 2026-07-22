import "./Notifications.css";

const notifications = [
  {
    id: 1,
    title: "New Order Received",
    receiver: "Shopkeeper",
    date: "01-07-2026",
    status: "Sent",
  },
  {
    id: 2,
    title: "Payment Successful",
    receiver: "Customer",
    date: "01-07-2026",
    status: "Pending",
  },
  {
    id: 3,
    title: "Medicine Stock Updated",
    receiver: "Distributor",
    date: "30-06-2026",
    status: "Sent",
  },
];

const Notification = () => {
  return (
    <div className="notification-page">

      <div className="notification-header">
        <h2>Notifications</h2>

        <button className="send-btn">
          + Send Notification
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Notification..."
        />
      </div>

      <div className="notification-table">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Receiver</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {notifications.map((item) => (

              <tr key={item.id}>

                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.receiver}</td>
                <td>{item.date}</td>

                <td>

                  <span
                    className={
                      item.status === "Sent"
                        ? "sent"
                        : "pending"
                    }
                  >
                    {item.status}
                  </span>

                </td>

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

export default Notification;