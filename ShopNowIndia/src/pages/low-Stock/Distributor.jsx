import React, { useEffect, useState } from "react";
import "./Distributor.css";
<<<<<<< HEAD
import { MedicinesList } from "../../services/api"; // ✅ API
=======
// import { getMedicines } from "../../services/api"; // ✅ API
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec

const DistributorLowStock = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
<<<<<<< HEAD
      const res = await MedicinesList();

      // 🔥 LOW STOCK FILTER (< 10)
      const lowStockData = res.filter((med) => med.stock < 50);
=======
      const res = await getMedicines();

      // 🔥 LOW STOCK FILTER (< 10)
      const lowStockData = res.filter((med) => med.stock < 10);
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec

      setMedicines(lowStockData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-content">
      <h2>Low Stock Medicines</h2>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Medicine</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {medicines.length > 0 ? (
            medicines.map((med, i) => (
              <tr key={med._id}>
                <td>{i + 1}</td>
                <td>{med.name}</td>
                <td className="low">{med.stock}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No Low Stock Medicines</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DistributorLowStock;