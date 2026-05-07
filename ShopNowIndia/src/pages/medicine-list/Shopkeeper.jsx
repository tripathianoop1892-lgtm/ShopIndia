import React, { useEffect, useState } from "react";
import "../../pages/dashboard/Shopkeeper.css";
import { addMedicine, addToCart } from "../../services/api";

const ShopkeeperMedicineList = () => {
  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);

  // 🔥 Load data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getMedicines();
      setMedicines(res);
    } catch (err) {
      console.log(err);
    }
  };

  // 🛒 ADD TO CART
  const handleAddToCart = async (med) => {
    try {
      await addToCart({
        medicineId: med._id,          // 🔥 IMPORTANT
        name: med.name,
        price: med.price || 100,      // fallback
        quantity: 1,                  // 🔥 consistent field
      });

      alert("Added to cart ✅");
    } catch (err) {
      console.log(err);
    }
  };

  // 🔍 Search
  const filteredData = medicines.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-content">
      <h2>Medicines List</h2>

      {/* 🔍 Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 📊 Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Stock</th>
              <th>Expiry</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((med) => (
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
                <td colSpan="4">No Medicine Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShopkeeperMedicineList;