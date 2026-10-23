import React, { useEffect, useState } from "react";
import "./Shopkeeper.css";
import { MedicinesList } from "../../services/api"; // ✅ API
import { exportRowsToExcel, exportRowsToPdf } from "../../utils/export";

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

  const exportRows = () => medicines.map((med, index) => ({
    "S.No": index + 1,
    "Medicine Name": med.name || "Medicine",
    "Medicine Type": med.type || "Medicine",
    "Stock Left": Number(med.stock || 0),
  }));

  const exportPdf = () => {
    if (!exportRowsToPdf("Shopkeeper Low Stock Report", exportRows(), "Medicines with fewer than 50 units in retail stock")) {
      alert(medicines.length ? "Please allow pop-ups to export the PDF." : "No low stock medicines available to export.");
    }
  };

  const exportExcel = () => {
    if (!medicines.length) return alert("No low stock medicines available to export.");
    exportRowsToExcel("Shopkeeper_Low_Stock", exportRows());
  };

  return (
    <div className="main-content shopkeeper-alert-page">
      <h2>Low Stock Medicines</h2>
      <div className="alert-export-actions">
        <button type="button" onClick={exportPdf}>Export PDF</button>
        <button type="button" onClick={exportExcel}>Export Excel</button>
      </div>

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
