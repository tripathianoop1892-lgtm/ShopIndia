import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Customer.css";
import { MedicinesList } from "../../services/api";

const Customer = () => {
  const navigate = useNavigate();

  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [cartItems] = useState(2);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await MedicinesList();

      if (Array.isArray(data)) {
        setMedicines(data);
      } else if (Array.isArray(data?.data)) {
        setMedicines(data.data);
      } else {
        setMedicines([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filtered = Array.isArray(medicines)
    ? medicines.filter((m) =>
        m.name?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">

      {/* 🔝 NAVBAR */}
      <div className="navbar">
        <h2>ShopNowIndia</h2>

        <input
          type="text"
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button> */}
      </div>

      {/* 🎯 Banner */}
      <div className="banner">
        <h3>🔥 10% Off on Medicines</h3>
        <p>Use code: HEALTH10</p>
      </div>

      {/* 📊 Cards */}
      <div className="cards">
        <div className="card">
          <p>💊 Total Medicines</p>
          <h3>{medicines.length}</h3>
        </div>

        <div
          className="card clickable"
          onClick={() => navigate("/customer/cart")}
        >
          <p>🛒 Cart Items</p>
          <h3>{cartItems}</h3>
        </div>

        <div className="card">
          <p>💰 Total Spent</p>
          <h3>₹0</h3>
        </div>
      </div>

      {/* 📦 Recommended */}
      <div className="section">
        <h3>Recommended Medicines</h3>

        <div className="recommend">
          {filtered.length > 0 ? (
            filtered.slice(0, 6).map((med) => (
              <div key={med._id} className="med-card">
                <p>{med.name}</p>
                <button
                  onClick={() => navigate("/customer/medicines")}
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <p>No medicines found</p>
          )}
        </div>
      </div>

      {/* ⚡ Quick Actions */}
      <div className="section">
        <h3>Quick Actions</h3>

        <div className="actions">
          <button onClick={() => navigate("/customer/medicines")}>
            💊 Browse Medicines
          </button>

          <button onClick={() => navigate("/customer/cart")}>
            🛒 Go to Cart
          </button>

          <button onClick={() => navigate("/customer/orders")}>
            📦 View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customer;