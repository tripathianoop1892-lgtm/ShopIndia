import React, { useEffect, useState } from "react";
import "./Distributor.css";
import { MedicinesList } from "../../services/api"; // ✅ API
import { exportRowsToExcel, exportRowsToPdf } from "../../utils/export";
const DistributorExpiring = () => {
  const [medicines, setMedicines] = useState([]);

  // 📅 Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchData();
  }, []);
async function fetchData() {
  try {
    const res = await MedicinesList();

    const today = new Date();

    // 🔥 EXPIRING FILTER (next 180 days)
    const expiringSoon = Array.isArray(res)
      ? res.filter((med) => {
          if (!med.expiry) return false;

          const expDate = new Date(med.expiry);

          const diff =
            (expDate - today) /
            (1000 * 60 * 60 * 24);

          return diff >= 0 && diff <= 180;
        })
      : [];

    setMedicines(expiringSoon);
  } catch (err) {
    console.log(err);
  }
};
// ==========================================
// EXPORT TO EXCEL
// ==========================================

const exportToExcel = () => {
  if (medicines.length === 0) {
    alert("No expiring medicines available to export.");
    return;
  }

  const excelData = medicines.map((med, index) => ({
    "S.No": index + 1,
    "Medicine Name": med.name || "",
    "Expiry Date": formatDate(med.expiry),
    "Stock": med.stock || 0,
  }));

  exportRowsToExcel("Expiring_Medicines_180_Days", excelData);
};

const exportToPdf = () => {
  const pdfData = medicines.map((med, index) => ({
    "S.No": index + 1,
    "Medicine Name": med.name || "Medicine",
    "Expiry Date": formatDate(med.expiry),
    "Stock": Number(med.stock || 0),
  }));
  if (!exportRowsToPdf("Distributor Expiry Alert Report", pdfData, "Medicines expiring within the next 180 days")) {
    alert(medicines.length ? "Please allow pop-ups to export the PDF." : "No expiring medicines available to export.");
  }
};
  return (
    <div className="main-content">
      <h2>Expiring Soon</h2>
      
       {/* 👇 EXPORT BUTTON यहीं ADD करना है */}
  <div className="alert-export-actions">
    <button type="button" onClick={exportToPdf} className="export-btn">Export PDF</button>
    <button type="button" onClick={exportToExcel} className="export-btn">Export Excel</button>
  </div>

  
      <table className="table">
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Expiry Date</th>
          </tr>
        </thead>

        <tbody>
          {medicines.length > 0 ? (
            medicines.map((med) => (
              <tr key={med._id}>
                <td>{med.name}</td>
                <td className="danger">{formatDate(med.expiry)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No Expiring Medicines</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DistributorExpiring;
