import React, { useEffect, useState } from "react";
import "./Shopkeeper.css";
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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await MedicinesList();

      const today = new Date();

      // 🔥 FILTER: sirf next 30 days
      const expiring = res.filter((med) => {
        const expDate = new Date(med.expiry);
        const diff = (expDate - today) / (1000 * 60 * 60 * 24);
        return diff < 30;
      });

      setMedicines(expiring);
    } catch (err) {
      console.log(err);
    }
  };

  const today = new Date();

  return (
    <div className="main-content">
      <h2>Expiry Alert</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Expiry Date</th>
          </tr>
        </thead>

        <tbody>
          {medicines.length > 0 ? (
            medicines.map((item) => {
              const expDate = new Date(item.expiry);
              const diff =
                (expDate - today) / (1000 * 60 * 60 * 24);

              let className = "normal";
              if (diff <= 3) className = "danger";   // 🔴 urgent
              else if (diff <= 7) className = "warning"; // 🟡 soon

              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td className={className}>
                    {formatDate(item.expiry)}
                  </td>
                </tr>
              );
            })
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

export default ShopkeeperExpiry;