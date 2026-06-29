import React, { useEffect, useState } from "react";
import "./Distributor.css";
<<<<<<< HEAD
import { MedicinesList } from "../../services/api"; // ✅ API
=======
// import { getMedicines } from "../../services/api"; // ✅ API
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec

const DistributorExpiring = () => {
  const [medicines, setMedicines] = useState([]);

<<<<<<< HEAD
  // 📅 Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

=======
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
<<<<<<< HEAD
      const res = await MedicinesList();
=======
      const res = await getMedicines();
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec

      const today = new Date();

      // 🔥 EXPIRING FILTER (next 30 days)
      const expiringSoon = res.filter((med) => {
        const expDate = new Date(med.expiry);
        const diff = (expDate - today) / (1000 * 60 * 60 * 24);
<<<<<<< HEAD
        return diff < 90;
=======
        return diff < 30;
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
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
<<<<<<< HEAD
                <td className="danger">{formatDate(med.expiry)}</td>
=======
                <td className="danger">{med.expiry}</td>
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
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