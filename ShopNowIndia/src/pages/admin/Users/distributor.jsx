import "./Distributor.css";

const distributors = [
  {
    id: 1,
    name: "ABC Pharma",
    owner: "Rahul Sharma",
    mobile: "9876543210",
    city: "Delhi",
    status: "Active",
  },
  {
    id: 2,
    name: "Health Care Distributors",
    owner: "Amit Kumar",
    mobile: "9123456789",
    city: "Lucknow",
    status: "Pending",
  },
  {
    id: 3,
    name: "MediPlus",
    owner: "Vikas Singh",
    mobile: "9988776655",
    city: "Kanpur",
    status: "Active",
  },
];

const Distributors = () => {
  return (
    <div className="distributor-page">

      <div className="page-header">
        <h2>Distributors</h2>

        <button className="add-btn">
          + Add Distributor
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Distributor..."
        />
      </div>

      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Company</th>
              <th>Owner</th>
              <th>Mobile</th>
              <th>City</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {distributors.map((item) => (

              <tr key={item.id}>

                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.owner}</td>
                <td>{item.mobile}</td>
                <td>{item.city}</td>

                <td>
                  <span
                    className={
                      item.status === "Active"
                        ? "active"
                        : "pending"
                    }
                  >
                    {item.status}
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

export default Distributors;