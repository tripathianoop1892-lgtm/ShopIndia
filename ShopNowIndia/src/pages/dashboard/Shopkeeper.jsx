import React, { useEffect, useState } from "react";
import "./Shopkeeper.css";
import { MedicinesList, getOrders } from "../../services/api";

const Shopkeeper = () => {
  const [medicines, setMedicines] = useState([]);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const medData = await MedicinesList();
      const orderData = await getOrders();

      setMedicines(Array.isArray(medData) ? medData : []);
      setOrders(Array.isArray(orderData) ? orderData : []);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔍 SEARCH
  const filteredMedicines = medicines.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  // 💊 BUY
  const buyMedicine = async (med) => {
    try {
      await fetch("http://localhost:5000/api/medicines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: med.name,
          price: med.price,
          stock: 1,
        }),
      });

      alert("Added to your stock ✅");
    } catch (err) {
      console.log(err);
    }
  };

  // 📊 CARDS
  const totalMedicines = medicines.length;
  const lowStock = medicines.filter((m) => m.stock <= 20).length;

  const totalExpiry = medicines.filter((m) => {
    if (!m.expiryDate) return false;
    const today = new Date();
    const exp = new Date(m.expiryDate);
    return exp < today;
  }).length;

  const earnings = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h2 className="h2">🏪 Shopkeeper Dashboard</h2>
          <p className="p">📍 Anoop Medical Store • Shiamgir, India</p>
        </div>

        <div className="header-actions">
          <span className="badge">📦 {orders.length} Orders</span>
        </div>
      </div>

      {/* 🔥 SEARCH (FIXED CENTER) */}
      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CARDS */}
      <div className="stats-grid">

        <div className="stat-card blue">
          <p>Total Medicines</p>
          <h3>{totalMedicines}</h3>
        </div>

        <div className="stat-card green">
          <p>Low Stock</p>
          <h3>{lowStock}</h3>
        </div>

        <div className="stat-card orange">
          <p>Total Expiry</p>
          <h3>{totalExpiry}</h3>
        </div>

        <div className="stat-card purple">
          <p>Earnings</p>
          <h3>₹{earnings}</h3>
        </div>

      </div>

      {/* 💊 MEDICINES */}
      <div className="section">
        <h3>💊 Available Medicines</h3>

        {filteredMedicines.length === 0 ? (
          <p>No medicines found</p>
        ) : (
          filteredMedicines.map((m) => (
            <div key={m._id} className="medicine-row">
              <div>
                <strong>{m.name}</strong> <br />
                ₹{m.price}
              </div>

              <button onClick={() => buyMedicine(m)}>
                Buy
              </button>
            </div>
          ))
        )}
      </div>

      {/* LOW STOCK */}
      <div className="section">

        <div className="section-header">
          <h3>⚠️ Low Stock Medicines</h3>
          <span>{lowStock} items</span>
        </div>

        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {medicines.filter(m => m.stock <= 20).length === 0 ? (
                <tr>
                  <td colSpan="3">No low stock</td>
                </tr>
              ) : (
                medicines
                  .filter(m => m.stock <= 20)
                  .map((m) => (
                    <tr key={m._id}>
                      <td>{m.name}</td>
                      <td>{m.stock}</td>
                      <td>
                        <span className="low-badge">Low</span>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};

export default Shopkeeper;