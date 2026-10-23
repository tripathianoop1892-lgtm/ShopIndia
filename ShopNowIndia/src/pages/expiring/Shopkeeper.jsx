import React, { useEffect, useState } from "react";
import "./Shopkeeper.css";
import "../low-Stock/Shopkeeper.css";
import { MedicinesList } from "../../services/api";

const ShopkeeperExpiry = () => {
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
      const res = await MedicinesList("?source=my-retail-stock");

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // 🔥 FILTER: sirf next 30 days
      const medicineList = Array.isArray(res?.medicines)
        ? res.medicines
        : Array.isArray(res)
        ? res
        : [];

      const expiring = medicineList.filter((med) => {
        if (!med.expiry) return false;
        const expDate = new Date(med.expiry);
        if (Number.isNaN(expDate.getTime())) return false;
        expDate.setHours(0, 0, 0, 0);
        const diff = (expDate - today) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= 180;
      }).sort((a, b) => new Date(a.expiry) - new Date(b.expiry));

      setMedicines(expiring);
    } catch (err) {
      console.log(err);
    }
  };

  const today = new Date();

  return (
    <div className="main-content shopkeeper-alert-page">
      <h2>Expiry Alert</h2>
      <p>Medicines expiring within the next 180 days.</p>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Medicine</th>
            <th>Expiry Date</th>
          </tr>
        </thead>

        <tbody>
          {medicines.length > 0 ? (
            medicines.map((item, index) => {
              const expDate = new Date(item.expiry);
              const diff =
                (expDate - today) / (1000 * 60 * 60 * 24);

              let className = "normal";
              if (diff <= 3) className = "danger";   // 🔴 urgent
              else if (diff <= 7) className = "warning"; // 🟡 soon

              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td className={className}>
                    {formatDate(item.expiry)}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3">No Expiring Medicines</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShopkeeperExpiry;
