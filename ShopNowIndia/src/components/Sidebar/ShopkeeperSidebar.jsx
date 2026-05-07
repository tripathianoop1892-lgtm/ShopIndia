import { NavLink, useNavigate } from "react-router-dom";
import "./ShopkeeperSidebar.css";

const ShopkeeperSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">ShopNowIndia</h2>

      <ul>
        <li><NavLink to="/shopkeeper">Dashboard</NavLink></li>
        <li><NavLink to="/shopkeeper/medicines">Medicines</NavLink></li>
        <li><NavLink to="/shopkeeper/add-medicine">Add Medicine</NavLink></li>
        <li><NavLink to="/shopkeeper/orders">Orders</NavLink></li>
        <li><NavLink to="/shopkeeper/cart">Cart</NavLink></li>
        <li><NavLink to="/shopkeeper/low-stock">Low Stock</NavLink></li>
        <li><NavLink to="/shopkeeper/earnings">Earnings</NavLink></li>
        <li><NavLink to="/shopkeeper/expiry">Expiry Alert</NavLink></li>
      </ul>

      {/* 🔴 Logout */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default ShopkeeperSidebar;