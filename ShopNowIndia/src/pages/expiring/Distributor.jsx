import React, { useEffect, useState } from "react";
import "./Distributor.css";
import { MedicinesList } from "../../services/api"; // ✅ API

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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await MedicinesList();

      const today = new Date();

      // 🔥 EXPIRING FILTER (next 30 days)
      const expiringSoon = res.filter((med) => {
        const expDate = new Date(med.expiry);
        const diff = (expDate - today) / (1000 * 60 * 60 * 24);
        return diff < 90;
      });

      setMedicines(expiringSoon);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-content">
      <h2>Expiring Soon</h2>

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