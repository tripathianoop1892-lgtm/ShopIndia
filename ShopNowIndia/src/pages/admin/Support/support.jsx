import "./Support.css";

const supportRequests = [
  {
    id: 1,
    name: "Anoop Tripathi",
    role: "Customer",
    subject: "Order Not Delivered",
    status: "Pending",
  },
  {
    id: 2,
    name: "Rahul Medical",
    role: "Shopkeeper",
    subject: "Medicine Stock Issue",
    status: "Resolved",
  },
  {
    id: 3,
    name: "ABC Pharma",
    role: "Distributor",
    subject: "Payment Settlement",
    status: "In Progress",
  },
];

const Support = () => {
  return (
    <div className="support-page">

      <div className="support-header">
        <h2>Support Center</h2>

        <button className="add-btn">
          + New Ticket
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Support Ticket..."
        />
      </div>

      <div className="support-table">

        <table>

          <thead>

            <tr>
              <th>Ticket ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {supportRequests.map((ticket) => (

              <tr key={ticket.id}>

                <td>#{ticket.id}</td>

                <td>{ticket.name}</td>

                <td>{ticket.role}</td>

                <td>{ticket.subject}</td>

                <td>

                  <span
                    className={
                      ticket.status === "Resolved"
                        ? "resolved"
                        : ticket.status === "Pending"
                        ? "pending"
                        : "progress"
                    }
                  >
                    {ticket.status}
                  </span>

                </td>

                <td>

                  <button className="view-btn">
                    View
                  </button>

                  <button className="reply-btn">
                    Reply
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

export default Support;