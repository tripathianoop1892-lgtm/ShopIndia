import React, { useEffect, useState } from "react";
import "./Shopkeeper.css";
<<<<<<< HEAD
import { MedicinesList } from "../../services/api";
=======
// import { getMedicines } from "../../services/api";
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec

const ShopkeeperExpiry = () => {
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
<<<<<<< HEAD
                    {formatDate(item.expiry)}
=======
                    {item.expiry}
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
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