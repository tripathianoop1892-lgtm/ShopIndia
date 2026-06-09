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
    m.name?.toLowerCase().includes(search.toLowerCase())
  );

  // 🛒 BUY
  const buyMedicine = async (med) => {
    try {

      await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        body: JSON.stringify({
          name: med.name,
          company: med.company,
          type: med.type,
          price: med.offerPrice || med.price,
          stock: 1,
          image: med.image,
          strength: med.strength,
          packSize: med.packSize,
          expiry:med.expiry || "2027-12-31"
        }),
      });

      alert("Medicine Added To Stock ✅");

    } catch (err) {
      console.log(err);
    }
  };

  // 📊 DASHBOARD CARDS
  const totalMedicines = medicines.length;

  const lowStock =
    medicines.filter((m) => m.stock <= 20).length;

  const earnings =
    orders.reduce(
      (sum, o) => sum + (o.total || 0),
      0
    );

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header">

        <div id="div1">
          <h2 className="dashboard-title">
            💊 Shopkeeper Dashboard
          </h2>

          <p className="dashboard-subtitle">
            Manage medicines & orders easily
          </p>
        </div>

        <div className="dashboard-badge">
          📦 {orders.length} Orders
        </div>

      </div>

      {/* SEARCH */}
      <div className="search-box">

        <input
          type="text"
          placeholder="🔍 Search medicines..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* STATS */}
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
          <p>Orders</p>
          <h3>{orders.length}</h3>
        </div>

        <div className="stat-card purple">
          <p>Earnings</p>
          <h3>₹{earnings}</h3>
        </div>

      </div>

      {/* MEDICINES */}
      <div className="section">

        <div className="section-header">
          <h3>💊 Available Medicines</h3>
        </div>

        {filteredMedicines.length === 0 ? (

          <p className="empty-text">
            No medicines found
          </p>

        ) : (

          <div className="medicine-grid">

            {filteredMedicines.map((m) => (

              <div
                key={m._id}
                className="medicine-card"
              >

                {/* IMAGE */}
                <div className="medicine-image-box">

                  <img
                    src={
                      m.image ||
                      "https://cdn-icons-png.flaticon.com/512/822/822143.png"
                    }
                    alt={m.name}
                    className="medicine-image"
                  />

                </div>

                {/* INFO */}
                <div className="medicine-info">

                  <h4>
                    {m.name}
                  </h4>

                  <p className="company">
                    {m.company}
                  </p>

                  <div className="medicine-tags">

                    <span>
                      {m.strength || "500mg"}
                    </span>

                    <span>
                      {m.packSize || 10} Tablets
                    </span>

                  </div>

                  <div className="price-box">

                    <h3>
                      ₹{m.offerPrice || m.price}
                    </h3>

                    {m.mrp && (
                      <del>
                        ₹{m.mrp}
                      </del>
                    )}

                  </div>

                  <div className="stock-row">

                    <span>
                      Stock:
                      {m.stock}
                    </span>

                    {m.discount && (
                      <span className="discount">
                        {m.discount}% OFF
                      </span>
                    )}

                  </div>

                  <button
                    className="buy-btn"
                    onClick={() =>
                      buyMedicine(m)
                    }
                  >
                    Add To Cart
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  );
};

export default Shopkeeper;