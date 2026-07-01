import "./Sidebar.css";
import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUsers,
  FaStore,
  FaTruck,
  FaCapsules,
  FaList,
  FaShoppingCart,
  FaMoneyBillWave,
  FaChartBar,
  FaGift,
  FaImage,
  FaBell,
  FaStar,
  FaHeadset,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "close"}`}>

      <div className="logo">
        <h2>OMS</h2>
      </div>

      <ul>

        <li>
          <NavLink to="/admin/dashboard">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/users">
            <FaUsers />
            <span>Users</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/shopkeepers">
            <FaStore />
            <span>Shopkeepers</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/distributors">
            <FaTruck />
            <span>Distributors</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/medicines">
            <FaCapsules />
            <span>Medicines</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/categories">
            <FaList />
            <span>Categories</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/orders">
            <FaShoppingCart />
            <span>Orders</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/payments">
            <FaMoneyBillWave />
            <span>Payments</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/reports">
            <FaChartBar />
            <span>Reports</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/coupons">
            <FaGift />
            <span>Coupons</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/banner">
            <FaImage />
            <span>Banner</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/notifications">
            <FaBell />
            <span>Notifications</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/reviews">
            <FaStar />
            <span>Reviews</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/support">
            <FaHeadset />
            <span>Support</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/settings">
            <FaCog />
            <span>Settings</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/profile">
            <FaUserCircle />
            <span>Profile</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/logout">
            <FaSignOutAlt />
            <span>Logout</span>
          </NavLink>
        </li>

      </ul>

    </div>
  );
};

export default Sidebar;