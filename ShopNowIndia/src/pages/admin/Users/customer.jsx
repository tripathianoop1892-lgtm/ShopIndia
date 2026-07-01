import "./Customer.css";

const customers = [
  {
    id: 1,
    name: "Anoop Tripathi",
    mobile: "9876543210",
    email: "anoop@gmail.com",
    city: "Delhi",
    status: "Active",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    mobile: "9876543211",
    email: "rahul@gmail.com",
    city: "Lucknow",
    status: "Pending",
  },
  {
    id: 3,
    name: "Priya Singh",
    mobile: "9876543212",
    email: "priya@gmail.com",
    city: "Kanpur",
    status: "Active",
  },
];

const Customer = () => {
  return (
    <div className="customer-page">

      <div className="page-header">
        <h2>Customers</h2>

        <button className="add-btn">
          + Add Customer
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Customer..."
        />
      </div>

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>City</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {customers.map((customer) => (

              <tr key={customer.id}>

                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.mobile}</td>
                <td>{customer.email}</td>
                <td>{customer.city}</td>

                <td>
                  <span
                    className={
                      customer.status === "Active"
                        ? "active"
                        : "pending"
                    }
                  >
                    {customer.status}
                  </span>
                </td>

                <td>

                  <button className="edit-btn">
                    Edit
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

export default Customer;