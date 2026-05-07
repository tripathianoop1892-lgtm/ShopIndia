import React, { useEffect, useState } from "react";
import "./distributor.css";

// 🔥 FIX
import { MedicinesList } from "../../services/api";

const DistributorDashboard = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {

      // 🔥 FIX
      const data = await MedicinesList();

      setMedicines(Array.isArray(data) ? data : []);

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Calculations
  const total = medicines.length;

  const inStock = medicines.filter(
    (m) => m.stock > 20
  ).length;

  const lowStock = medicines.filter(
    (m) => m.stock <= 20
  ).length;

  // 🔥 Expiring within 30 days
  const expiring = medicines.filter((m) => {

    if (!m.expiry) return false;

    const today = new Date();
    const expDate = new Date(m.expiry);

    const diff =
      (expDate - today) / (1000 * 60 * 60 * 24);

    return diff <= 30;

  }).length;

  return (
    <div className="main">

      <h1>Distributor Dashboard</h1>
      <p>Anoop Medical Store • Shiamgir, India</p>

      {/* Cards */}
      <div className="cards">

        <div className="card blue">
          <h2>{total}</h2>
          <p>Total Medicines</p>
        </div>

        <div className="card green">
          <h2>{inStock}</h2>
          <p>In Stock</p>
        </div>

        <div className="card orange">
          <h2>{lowStock}</h2>
          <p>Low Stock</p>
        </div>

        <div className="card red">
          <h2>{expiring}</h2>
          <p>Expiring Soon</p>
        </div>

        <div className="card purple">
          <h2>₹0</h2>
          <p>Total Earnings</p>
        </div>

      </div>

      {/* Low Stock Table */}
      <div className="section">

        <h3>Low Stock Medicines</h3>

        <table>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>
            {medicines
              .filter((m) => m.stock <= 20)
              .map((m) => (
                <tr key={m._id}>
                  <td>{m.name}</td>
                  <td className="low">{m.stock}</td>
                </tr>
              ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default DistributorDashboard;