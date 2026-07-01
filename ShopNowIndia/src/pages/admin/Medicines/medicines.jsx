import "./Medicines.css";

const medicines = [
  {
    id: 1,
    name: "Paracetamol 650",
    category: "Tablet",
    company: "Sun Pharma",
    price: "₹45",
    stock: 120,
    status: "Available",
  },
  {
    id: 2,
    name: "Dolo 650",
    category: "Tablet",
    company: "Micro Labs",
    price: "₹35",
    stock: 80,
    status: "Available",
  },
  {
    id: 3,
    name: "Vitamin C",
    category: "Capsule",
    company: "Cipla",
    price: "₹120",
    stock: 15,
    status: "Low Stock",
  },
];

const Medicines = () => {
  return (
    <div className="medicine-page">

      <div className="page-header">
        <h2>Medicines</h2>

        <button className="add-btn">
          + Add Medicine
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Medicine..."
        />
      </div>

      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Medicine</th>
              <th>Category</th>
              <th>Company</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {medicines.map((medicine) => (

              <tr key={medicine.id}>

                <td>{medicine.id}</td>
                <td>{medicine.name}</td>
                <td>{medicine.category}</td>
                <td>{medicine.company}</td>
                <td>{medicine.price}</td>
                <td>{medicine.stock}</td>

                <td>
                  <span
                    className={
                      medicine.status === "Available"
                        ? "available"
                        : "low-stock"
                    }
                  >
                    {medicine.status}
                  </span>
                </td>

                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Medicines;