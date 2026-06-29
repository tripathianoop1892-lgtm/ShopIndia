import React, { useEffect, useState } from "react";
import "./distributor.css";
import { MedicinesList } from "../../services/api";
import { FaBell } from "react-icons/fa";

const DistributorDashboard = () => {

  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [showNotifications, setShowNotifications] = useState(false);
=======
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec

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

<<<<<<< HEAD
  // Get expiring medicines list
  const expiringMedicines = medicines.filter((m) => {
    if (!m.expiry) return false;
    const today = new Date();
    const expDate = new Date(m.expiry);
    const diff = (expDate - today) / (1000 * 60 * 60 * 24);
    return diff <= 30 && diff >= 0;
  });

  // Get low stock medicines list
  const lowStockMedicines = medicines.filter((m) => Number(m.stock) <= 20);

=======
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
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
<<<<<<< HEAD
=======

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
          <p>
            Welcome back • Anoop Medical Store
          </p>
        </div>

        {/* 🔥 ACTIONS */}
        <div className="top-actions">

          {/* 🔔 NOTIFICATION */}
<<<<<<< HEAD
          <div 
            className="notification"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Click to view alerts"
          >

            <FaBell className="bell-icon" />

          </div>

          {/* 🔥 NOTIFICATION PANEL */}
          {showNotifications && (
            <div className="notification-panel">
              <div className="notification-header">
                <h3>📢 Alerts & Notifications</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowNotifications(false)}
                >
                  ✕
                </button>
              </div>

              {/* LOW STOCK ALERTS */}
              <div className="notification-section">
                <h4 className="section-title">
                  ⚠️ Low Stock ({lowStockMedicines.length})
                </h4>
                {lowStockMedicines.length === 0 ? (
                  <p className="no-alerts">All medicines in stock ✓</p>
                ) : (
                  <div className="alert-list">
                    {lowStockMedicines.slice(0, 5).map((med) => (
                      <div key={med._id} className="alert-item low-stock">
                        <div className="alert-icon">📦</div>
                        <div className="alert-content">
                          <p className="alert-name">{med.name}</p>
                          <p className="alert-detail">Stock: {med.stock} units</p>
                        </div>
                      </div>
                    ))}
                    {lowStockMedicines.length > 5 && (
                      <p className="more-alerts">+{lowStockMedicines.length - 5} more</p>
                    )}
                  </div>
                )}
              </div>

              {/* EXPIRING ALERTS */}
              <div className="notification-section">
                <h4 className="section-title">
                  ⏰ Expiring Soon ({expiringMedicines.length})
                </h4>
                {expiringMedicines.length === 0 ? (
                  <p className="no-alerts">No medicines expiring soon ✓</p>
                ) : (
                  <div className="alert-list">
                    {expiringMedicines.slice(0, 5).map((med) => {
                      const expDate = new Date(med.expiry);
                      const today = new Date();
                      const daysLeft = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
                      return (
                        <div key={med._id} className="alert-item expiring">
                          <div className="alert-icon">🕐</div>
                          <div className="alert-content">
                            <p className="alert-name">{med.name}</p>
                            <p className="alert-detail">
                              Expires in {daysLeft} days ({expDate.toLocaleDateString()})
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    {expiringMedicines.length > 5 && (
                      <p className="more-alerts">+{expiringMedicines.length - 5} more</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Overlay */}
          {showNotifications && (
            <div 
              className="notification-overlay"
              onClick={() => setShowNotifications(false)}
            ></div>
          )}

=======
          <div className="notification">

            <FaBell className="bell-icon" />

            <span className="badge">
              {lowStock + expiring}
            </span>

          </div>

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
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
<<<<<<< HEAD
            </div>
=======
            </div><br/>
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec

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

<<<<<<< HEAD
              <table id="table1">
=======
           {/* {lowStock === 0 ? (

              <div className="empty">
                No Low Stock Medicines
              </div> 


             : ( */}

              <table id="table1">

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
                <thead>
                  <tr>
                    <th>Medicine</th>
                    <th>Company</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Expiry</th>
                  </tr>
                </thead>
<<<<<<< HEAD
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
=======

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

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
                        <td>
                          {m.expiry
                            ? new Date(
                                m.expiry
                              ).toLocaleDateString()
                            : "N/A"}
                        </td>
<<<<<<< HEAD
                      </tr>
                    ))}
                </tbody>
              </table>
=======

                      </tr>

                    ))}

                </tbody>

              </table>

           

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
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