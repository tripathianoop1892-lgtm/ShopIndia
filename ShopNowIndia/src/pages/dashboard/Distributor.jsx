import React, { useEffect, useState } from "react";
import "./distributor.css";
import { MedicinesList } from "../../services/api";
import { FaBell } from "react-icons/fa";

const DistributorDashboard = () => {

  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {

      setLoading(true);

      const data = await MedicinesList();

      setMedicines(Array.isArray(data) ? data : []);

    } catch (err) {

      console.log(err);
      setMedicines([]);

    } finally {

      setLoading(false);

    }
  };

  // 🔥 Stats
  const total = medicines.length;

  const inStock = medicines.filter(
    (m) => Number(m.stock) > 20
  ).length;

  const lowStock = medicines.filter(
    (m) => Number(m.stock) <= 20
  ).length;

  const outOfStock = medicines.filter(
    (m) => Number(m.stock) === 0
  ).length;

  // 🔥 Expiring in 30 days
  const expiring = medicines.filter((m) => {

    if (!m.expiry) return false;

    const today = new Date();
    const expDate = new Date(m.expiry);

    const diff =
      (expDate - today) / (1000 * 60 * 60 * 24);

    return diff <= 30 && diff >= 0;

  }).length;

  // 🔥 Total Inventory Value
  const totalValue = medicines.reduce((acc, item) => {

    return (
      acc +
      Number(item.offerPrice || item.mrp || 0) *
      Number(item.stock || 0)
    );

  }, 0);

  return (

    <div className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header">

        <div>
          <h1>Distributor Dashboard</h1>

          <p>
            Welcome back • Anoop Medical Store
          </p>
        </div>

        {/* 🔥 ACTIONS */}
        <div className="top-actions">

          {/* 🔔 NOTIFICATION */}
          <div className="notification">

            <FaBell className="bell-icon" />

            <span className="badge">
              {lowStock + expiring}
            </span>

          </div>

          {/* 🔄 REFRESH */}
          <button
            className="refresh-btn"
            onClick={fetchData}
          >
            Refresh
          </button>

        </div>

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="loading">
          Loading Dashboard...
        </div>

      ) : (

        <>
          {/* STATS CARDS */}
          <div className="cards">

            <div className="card blue">
              <div>
                <h2>{total}</h2>
                <p>Total Medicines</p>
              </div>
            </div>

            <div className="card green">
              <div>
                <h2>{inStock}</h2>
                <p>In Stock</p>
              </div>
            </div>

            <div className="card orange">
              <div>
                <h2>{lowStock}</h2>
                <p>Low Stock</p>
              </div>
            </div><br/>

            <div className="card red">
              <div>
                <h2>{outOfStock}</h2>
                <p>Out Of Stock</p>
              </div>
            </div>

            <div className="card pink">
              <div>
                <h2>{expiring}</h2>
                <p>Expiring Soon</p>
              </div>
            </div>

            <div className="card purple">
              <div>
                <h2>₹{totalValue}</h2>
                <p>Total Inventory Value</p>
              </div>
            </div>

          </div>

          {/* LOW STOCK */}
          <div className="section">

             <div className="section-header">
              <h3>Low Stock Medicines</h3>
            </div>

           {/* {lowStock === 0 ? (

              <div className="empty">
                No Low Stock Medicines
              </div> 


             : ( */}

              <table id="table1">

                <thead>
                  <tr>
                    <th>Medicine</th>
                    <th>Company</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Expiry</th>
                  </tr>
                </thead>

                <tbody>

                  {medicines
                    .filter((m) => Number(m.stock) <= 20)
                    .map((m) => (

                      <tr key={m._id}>

                        <td>{m.name}</td>

                        <td>
                          {m.company || "N/A"}
                        </td>

                        <td>
                          ₹{m.offerPrice || m.mrp || 0}
                        </td>

                        <td className="low">
                          {m.stock}
                        </td>

                        <td>
                          {m.expiry
                            ? new Date(
                                m.expiry
                              ).toLocaleDateString()
                            : "N/A"}
                        </td>

                      </tr>

                    ))}

                </tbody>

              </table>

           

          </div>

          {/* RECENT MEDICINES */}
          <div className="section">

            <div className="section-header">
              <h3>Recent Medicines</h3>
            </div>

            <table>

              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Company</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {medicines
                  .slice(0, 5)
                  .map((m) => (

                    <tr key={m._id}>

                      <td>{m.name}</td>

                      <td>
                        {m.company || "N/A"}
                      </td>

                      <td>
                        ₹{m.offerPrice || m.mrp || 0}
                      </td>

                      <td>{m.stock}</td>

                      <td>

                        {m.stock > 20 ? (

                          <span className="status in">
                            In Stock
                          </span>

                        ) : (

                          <span className="status low-status">
                            Low
                          </span>

                        )}

                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>
        </>

      )}

    </div>
  );
};

export default DistributorDashboard;