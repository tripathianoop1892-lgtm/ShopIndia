import React, { useEffect, useState } from "react";
import "./Customer.css";
import { addMedicine, addToCart } from "../../services/api"; // ✅ FIX

const CustomerMedicineList = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getMedicines(); // ✅ FIX
      setMedicines(res);
    } catch (err) {
      console.log(err);
    }
  };

  // 🛒 ADD TO CART
  const handleAddToCart = async (med) => {
    try {
      await addToCart({
        medicineId: med._id,        // 🔥 IMPORTANT
        name: med.name,
        price: med.price || 50,     // fallback
        quantity: 1,                // 🔥 FIX
      });

      alert("Added to cart ✅");
    } catch (err) {
      console.log(err);
      alert("Error adding to cart ❌");
    }
  };

  return (
    <div className="main-content">
      <h2>Medicines</h2>

      <table className="medicine-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Stock</th>
            <th>Expiry</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {medicines.length > 0 ? (
            medicines.map((med) => (
              <tr key={med._id}>
                <td>{med.name}</td>
                <td>{med.stock}</td>
                <td>{med.expiry}</td>

                <td>
                  <button onClick={() => handleAddToCart(med)}>
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No Medicines Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerMedicineList;