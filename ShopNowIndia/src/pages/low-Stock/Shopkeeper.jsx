import React, { useEffect, useState } from "react";
import "./Shopkeeper.css";
import { MedicinesList } from "../../services/api"; // ✅ API

const ShopkeeperLowStock = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await MedicinesList();

      // 🔥 LOW STOCK FILTER (< 10)
      const lowStockData = res.filter((med) => med.stock < 10);

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
            <th>Medicine</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {medicines.length > 0 ? (
            medicines.map((med) => (
              <tr key={med._id}>
                <td>{med.name}</td>
                <td className="low">{med.stock}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No Low Stock Medicines</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShopkeeperLowStock;
