import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Customer.css";
import { MedicinesList } from "../../services/api";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cartSlice";

const Customer = () => {
  const navigate = useNavigate();

  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ Redux
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

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
        <h2 className="nav-h2">ShopNowIndia</h2>

        <input
        className="input1"
          type="text"
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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

          {/* ✅ Redux Count */}
          <h3>{cartItems.length}</h3>
        </div>

        <div className="card">
          <p>💰 Total Spent</p>
          <h3>₹0</h3>
        </div>
      </div>

      {/* 📦 Recommended */}
      <div className="newdiv">
        <div className="section">
          <h3>Recommended Medicines</h3>

          <div className="recommend">
            {filtered.length > 0 ? (
              filtered.slice(0, 6).map((med) => (
                <div key={med._id} className="med-card">
                  <p>{med.name}</p>
                  <p>{med.company}</p>
                  {/* ✅ Add To Cart */}
                  <button
                    onClick={() => dispatch(addToCart(med))}
                  >
                    Add To Cart
                  </button>
                </div>
              ))
            ) : (
              <p>No medicines found</p>
            )}
          </div>
        </div>
      </div>
      

      {/* ⚡ Quick Actions */}
      
      
    </div>
  );
};

export default Customer;