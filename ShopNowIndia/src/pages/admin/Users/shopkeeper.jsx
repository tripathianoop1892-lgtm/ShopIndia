import "./Shopkeeper.css";

const shopkeepers = [
  {
    id: 1,
    shopName: "Anoop Medical Store",
    owner: "Anoop Tripathi",
    mobile: "9876543210",
    city: "Delhi",
    status: "Active",
  },
  {
    id: 2,
    shopName: "Shiv Medical",
    owner: "Rahul Sharma",
    mobile: "9876543211",
    city: "Lucknow",
    status: "Pending",
  },
  {
    id: 3,
    shopName: "Life Care Pharmacy",
    owner: "Amit Singh",
    mobile: "9876543212",
    city: "Kanpur",
    status: "Active",
  },
];

const Shopkeeper = () => {
  return (
    <div className="shopkeeper-page">

      <div className="page-header">
        <h2>Shopkeepers</h2>

        <button className="add-btn">
          + Add Shopkeeper
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Shopkeeper..."
        />
      </div>

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Shop Name</th>
              <th>Owner</th>
              <th>Mobile</th>
              <th>City</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {shopkeepers.map((shop) => (

              <tr key={shop.id}>

                <td>{shop.id}</td>
                <td>{shop.shopName}</td>
                <td>{shop.owner}</td>
                <td>{shop.mobile}</td>
                <td>{shop.city}</td>

                <td>
                  <span
                    className={
                      shop.status === "Active"
                        ? "active"
                        : "pending"
                    }
                  >
                    {shop.status}
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

export default Shopkeeper;