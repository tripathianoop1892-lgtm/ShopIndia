import React, { useEffect, useState } from "react";
import "./Distributor.css";

const DistributorStock = () => {
  const [medicines, setMedicines] = useState([]);
  const [qty, setQty] = useState({}); // 🔥 separate state

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    const res = await fetch("http://localhost:5000/medicines");
    const data = await res.json();
    setMedicines(data);
  };

  // 🔥 qty change
  const handleQtyChange = (id, value) => {
    setQty((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 🔥 update stock
  const updateStock = async (id, currentStock) => {
    const value = Number(qty[id]);

    if (!value) {
      alert("Enter valid qty ❌");
      return;
    }

    const newStock = currentStock + value;

    await fetch(`http://localhost:5000/medicine/${id}`, { // 🔥 route fix
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock: newStock }),
    });

    // 🔥 reset input
    setQty((prev) => ({ ...prev, [id]: "" }));

    fetchMedicines(); // refresh
  };

  return (
    <div className="stock-container">
      <h2>Stock Update</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Medicine</th>
            <th>Stock</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {medicines.map((med) => (
            <tr key={med._id}>
              <td>{med._id.slice(-4)}</td>
              <td>{med.name}</td>
              <td>{med.stock}</td>

              <td>
                <input
                  type="number"
                  placeholder="Qty"
                  value={qty[med._id] || ""}
                  onChange={(e) =>
                    handleQtyChange(med._id, e.target.value)
                  }
                />

                <button
                  onClick={() =>
                    updateStock(med._id, med.stock)
                  }
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DistributorStock;