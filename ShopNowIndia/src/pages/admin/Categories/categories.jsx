import "./Categories.css";

const categories = [
  {
    id: 1,
    category: "Tablet",
    totalMedicine: 245,
    status: "Active",
  },
  {
    id: 2,
    category: "Capsule",
    totalMedicine: 180,
    status: "Active",
  },
  {
    id: 3,
    category: "Injection",
    totalMedicine: 95,
    status: "Inactive",
  },
  {
    id: 4,
    category: "Syrup",
    totalMedicine: 150,
    status: "Active",
  },
];

const Categories = () => {
  return (
    <div className="categories-page">

      <div className="categories-header">
        <h2>Medicine Categories</h2>

        <button className="add-btn">
          + Add Category
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Category..."
        />
      </div>

      <div className="categories-table">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Total Medicines</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {categories.map((item) => (

              <tr key={item.id}>

                <td>{item.id}</td>

                <td>{item.category}</td>

                <td>{item.totalMedicine}</td>

                <td>

                  <span
                    className={
                      item.status === "Active"
                        ? "active"
                        : "inactive"
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

export default Categories;