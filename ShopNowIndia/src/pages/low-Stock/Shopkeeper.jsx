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
      const res = await MedicinesList("?source=my-retail-stock");

      const medicineList = Array.isArray(res?.medicines)
        ? res.medicines
        : Array.isArray(res)
        ? res
        : [];

      const lowStockData = medicineList.filter(
        (med) => Number(med.stock || 0) < 50
      );

      setMedicines(lowStockData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-content shopkeeper-alert-page">
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
            medicines.map((med, index) => (
              <tr key={med._id}>
                <td>{index + 1}</td>
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

export default ShopkeeperLowStock;
