import React, { useEffect, useState } from "react";
import "./Distributor.css";
import { MedicinesList } from "../../services/api"; // ✅ API
import { exportRowsToExcel, exportRowsToPdf } from "../../utils/export";

const DistributorLowStock = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await MedicinesList();

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
    if (!exportRowsToPdf("Distributor Low Stock Report", exportRows(), "Medicines with fewer than 50 units in stock")) {
      alert(medicines.length ? "Please allow pop-ups to export the PDF." : "No low stock medicines available to export.");
    }
  };

  const exportExcel = () => {
    if (!medicines.length) return alert("No low stock medicines available to export.");
    exportRowsToExcel("Distributor_Low_Stock", exportRows());
  };

  return (
    <div className="low-stock-container">
      <h2>Low Stock Medicines</h2>
      <div className="alert-export-actions">
        <button type="button" onClick={exportPdf}>Export PDF</button>
        <button type="button" onClick={exportExcel}>Export Excel</button>
      </div>

      <div className="low-stock-table-scroll" role="region" aria-label="Low stock medicines table" tabIndex="0">
      <table className="low-stock-table">
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
    </div>
  );
};

export default DistributorLowStock;
